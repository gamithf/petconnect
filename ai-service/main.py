from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS
import json
from PIL import Image
import torch
from torchvision import models, transforms
import torch.nn.functional as F
import io
from torch import nn
from PIL import Image
import cv2
import os
import tempfile
import requests
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": [
            "http://localhost:5173",
            "https://petconnect-92xg.vercel.app"
        ]
    }
})

# Load models
try:
    # symptoms prediction model
    MODEL = pickle.load(open("models/symptoms-analyzer-model/symptoms_analyzer_model.pkl", "rb"))
    print("Symptoms Analyzer Model loaded successfully.")

    # image prediction model
    image_prediction_model = models.mobilenet_v2(pretrained=False)
    image_prediction_model.classifier[1] = torch.nn.Linear(1280, 6)
    image_prediction_model.load_state_dict(torch.load("models/image-analyzer-model/image_analyzer_model.pth", map_location=torch.device('cpu')))
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
    print("Image Analyzer Model loaded successfully.")

except Exception as e:
    print(f"Failed to load model: {str(e)}")
    MODEL = None

def query_ai(prompt):
    try:
        API_KEY = os.getenv('API_KEY')
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "model": "deepseek/deepseek-r1:free",
                "messages": [
                {
                    "role": "user",
                    "content": f"You are a chat assistant in a web application that is built for users with pets, your name is Pawli. Make your responses short and clear. This is the question user asked: {prompt}"
                }
                ],
                
            })
        )
        response.raise_for_status()  # Raise error for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

@app.route("/", methods=["GET"])
def base_api():
    return jsonify({"message": "Welcome to the PetConnect AI API!"})

@app.route("/ask", methods=["POST"])
def ask_ollama():
    """API endpoint to handle Ollama queries."""
    data = request.get_json()
    prompt = data.get("prompt")
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    response = query_ai(prompt)
    print("API response:", response)
    message_content = response.get("message", {}).get("content", None)
    if message_content is None:
        message_content = "Pawli is busy. Try again later."
    return jsonify({"response": message_content})


@app.route('/analyze-symptoms', methods=['POST'])
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

@app.route("/analyze-image", methods=["POST"])
def analyze_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    try:
        img = Image.open(io.BytesIO(file.read()))
        label, confidence = predict_image(img)
        return jsonify({"prediction": label, "confidence": round(confidence, 4)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Load video analyzer model
LABELS = ['Dermatitis', 'Fungal_infections', 'Healthy', 'Hypersensitivity', 'demodicosis', 'ringworm']
try:
    DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = models.mobilenet_v2(weights=None)
    model.classifier[1] = nn.Linear(1280, 6)
    model.load_state_dict(torch.load("models/video-analyzer-model/video_analyzer_model.pth", map_location=DEVICE))
    model.to(DEVICE)
    model.eval()

    print("Video Analyzer Model loaded successfully.")

except Exception as e:
    print(f"Failed to load video analyzer model: {str(e)}")
    model = None
    LABELS = []

def predict_from_video(video_path, frame_interval=30):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406], 
            std=[0.229, 0.224, 0.225]
        )
    ])

    cap = cv2.VideoCapture(video_path)
    frames = []
    frame_idx = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if frame_idx % frame_interval == 0:
            img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            img_tensor = transform(img).unsqueeze(0).to(DEVICE)
            frames.append(img_tensor)
        frame_idx += 1

    cap.release()

    if not frames:
        return "No frames extracted"

    all_preds = []
    with torch.no_grad():
        for frame_tensor in frames:
            output = model(frame_tensor)
            probs = F.softmax(output[0], dim=0)
            pred_idx = torch.argmax(probs).item()
            all_preds.append(pred_idx)

    final_pred_idx = max(set(all_preds), key=all_preds.count)
    return LABELS[final_pred_idx]

# Route to upload and predict
@app.route("/analyze-video", methods=["POST"])
def analyze_video():
    if "file" not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    tmp_path = tmp.name
    tmp.close()
    file.save(tmp_path)

    try:
        prediction = predict_from_video(tmp_path)
        return jsonify({"prediction": prediction})
    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)


if __name__ == '__main__':
    app.run(debug=True)