import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader
from tqdm import tqdm

# === CONFIG ===
DATA_DIR = "dataset"
NUM_CLASSES = 6
BATCH_SIZE = 16
EPOCHS = 10
MODEL_PATH = "animal_skin_diseases.pth"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# === TRANSFORMS ===
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
    ),
])

# === DATASET ===
train_dataset = datasets.ImageFolder(DATA_DIR, transform=transform)
train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)

# === CLASS LABELS ===
class_names = train_dataset.classes
print("Detected classes:", class_names)

# === MODEL ===
model = models.mobilenet_v2(pretrained=True)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, NUM_CLASSES)
model = model.to(DEVICE)

# === LOSS & OPTIMIZER ===
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001)

# === TRAINING LOOP ===
for epoch in range(EPOCHS):
    model.train()
    running_loss = 0.0
    correct = 0

    loop = tqdm(train_loader, desc=f"Epoch {epoch+1}/{EPOCHS}")
    for inputs, labels in loop:
        inputs, labels = inputs.to(DEVICE), labels.to(DEVICE)

        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        # Stats
        running_loss += loss.item()
        preds = outputs.argmax(dim=1)
        correct += (preds == labels).sum().item()

        loop.set_postfix(loss=loss.item())

    acc = correct / len(train_dataset)
    print(f"Epoch {epoch+1} - Loss: {running_loss:.4f}, Accuracy: {acc:.4f}")

# === SAVE MODEL ===
torch.save(model.state_dict(), MODEL_PATH)
print(f"✅ Model saved to: {MODEL_PATH}")
