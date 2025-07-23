import torch
from torch import nn
from torchvision import transforms, models
from torch.nn import functional as F
from PIL import Image
import cv2

# Load model
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.mobilenet_v2(weights=None)  # Updated to avoid deprecation warning
model.classifier[1] = nn.Linear(1280, 6)
model.load_state_dict(torch.load("video_analyzer_model.pth", map_location=DEVICE))
model = model.to(DEVICE)
model.eval()

# Label list
labels = ['Dermatitis', 'Fungal_infections', 'Healthy', 'Hypersensitivity', 'demodicosis', 'ringworm']

# Prediction function
def predict_from_video(video_path, model, labels, frame_interval=30):
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

    # Predict on sampled frames
    all_preds = []
    with torch.no_grad():
        for frame_tensor in frames:
            output = model(frame_tensor)
            probs = F.softmax(output[0], dim=0)
            pred_idx = torch.argmax(probs).item()
            all_preds.append(pred_idx)

    # Majority vote
    final_pred_idx = max(set(all_preds), key=all_preds.count)
    return labels[final_pred_idx]

# Run
print(f"Prediction from video: {predict_from_video('test_video.mp4', model, labels)}")
