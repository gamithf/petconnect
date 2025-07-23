from torchvision import models, transforms
from PIL import Image
import torch
import torch.nn.functional as F

# Load model
model = models.mobilenet_v2(pretrained=False)
model.classifier[1] = torch.nn.Linear(1280, 6)
model.load_state_dict(torch.load("animal_skin_diseases.pth"))
model.eval()

# Labels (must match training order)
labels = ['Dermatitis', 'Fungal_infections', 'Healthy', 'Hypersensitivity', 'demodicosis', 'ringworm']

# Predict
def predict(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
        ),
    ])
    img = Image.open(image_path).convert("RGB")
    img_tensor = transform(img).unsqueeze(0)

    with torch.no_grad():
        outputs = model(img_tensor)
        probs = F.softmax(outputs[0], dim=0)
        pred_idx = torch.argmax(probs).item()
        return labels[pred_idx], probs[pred_idx].item()

cls, conf = predict("test_dog1.jpg")
print(f"Prediction: {cls} ({conf:.2%})")
