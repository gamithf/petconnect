from flask import Flask, request, jsonify
import pickle
import pandas as pd
import openai
from flask_cors import CORS
import json
from PIL import Image
import torch
from torchvision import models, transforms
import torch.nn.functional as F
import io

app = Flask(__name__)
CORS(app)

# Load models
try:
    # symptoms prediction model
    MODEL = pickle.load(open("symptoms_predict/Random1_local.pkl", "rb"))
    print("Model loaded successfully.")

    # image prediction model
    image_prediction_model = models.mobilenet_v2(pretrained=False)
    image_prediction_model.classifier[1] = torch.nn.Linear(1280, 6)
    image_prediction_model.load_state_dict(torch.load("animal_skin_diseases.pth", map_location=torch.device('cpu')))
    image_prediction_model.eval()

    # === Labels ===
    labels = ['Dermatitis', 'Fungal_infections', 'Healthy', 'Hypersensitivity', 'demodicosis', 'ringworm']

    # === Transform ===
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
        ),
    ])
    print("Image prediction model loaded successfully.")

except Exception as e:
    print(f"Failed to load model: {str(e)}")
    MODEL = None

@app.route('/chat', methods=['POST'])
def chat():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    try:
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "Message field is required"}), 400

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Pawli, a friendly pet care assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        ai_message = response.choices[0].message["content"].strip()
        return jsonify({"response": ai_message})

    except json.JSONDecodeError as e:
        return jsonify({"error": "Invalid JSON format"}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/predict-disease-with-symptoms', methods=['POST'])
def predict_disease_route():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    try:
        data = request.json
        
        required_fields = ['AnimalName', 'symptoms1', 'symptoms2', 'symptoms3', 'symptoms4', 'symptoms5']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return jsonify({
                "error": "Missing required fields",
                "missing": missing_fields
            }), 400

        if not all(isinstance(data[field], str) for field in required_fields):
            return jsonify({"error": "All fields must be strings"}), 400

        if MODEL is None:
            return jsonify({"error": "Prediction service unavailable"}), 503

        input_data = pd.DataFrame([[
            data['AnimalName'], 
            data['symptoms1'],
            data['symptoms2'],
            data['symptoms3'],
            data['symptoms4'],
            data['symptoms5']
        ]], columns=required_fields)
        
        prediction = MODEL.predict(input_data)[0]
        return jsonify({
            "prediction": prediction,
            "message": f"The {data['AnimalName']} is suffering from {prediction}."
        })

    except json.JSONDecodeError as e:
        return jsonify({"error": "Invalid JSON format"}), 400
    except Exception as e:
        return jsonify({"error": "Prediction failed"}), 500


# === Predict Function ===
def predict_image(img):
    img = img.convert("RGB")
    img_tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        outputs = image_prediction_model(img_tensor)
        probs = F.softmax(outputs[0], dim=0)
        pred_idx = torch.argmax(probs).item()
        return labels[pred_idx], float(probs[pred_idx])
    
@app.route("/predict-disease-with-image", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    try:
        img = Image.open(io.BytesIO(file.read()))
        label, confidence = predict_image(img)
        return jsonify({"prediction": label, "confidence": round(confidence, 4)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)