# 🐾 PetConnect

**PetConnect** is your intelligent companion for all things pets! Powered by AI and built with a heart for animals, PetConnect is an all-in-one web platform designed to help pet owners and animal lovers connect, care, and support their furry friends and communities.

---

## 🌟 Features

### 🤖 AI Services

#### 🎥 Video & 🖼️ Image Analyzer
PetConnect uses a custom-trained **MobileNetV2** model to detect skin diseases in pets through image or video inputs.

- 🧠 **Deep Learning Model**:
  - Built with PyTorch using `MobileNetV2`, fine-tuned to classify pet skin conditions.
  - Trained to detect 6 classes:
    - `Dermatitis`
    - `Fungal infections`
    - `Healthy`
    - `Hypersensitivity`
    - `Demodicosis`
    - `Ringworm`
- 🎬 **Video Analysis**:
  - Extracts frames from the uploaded video at regular intervals.
  - Runs inference on each frame.
  - Uses **majority voting** across all frame predictions to determine the final result.
- 🖼️ **Image Analysis**:
  - Processes a single image and predicts the condition using the same model pipeline.
- ⚡ Lightweight and efficient, designed to run on both CPU and GPU.

#### 📝 Symptom-Based Disease Prediction
Users can enter up to **5 symptoms**, and our NLP-based model will analyze them to predict the most likely disease affecting their pet.
- Existing model used: https://github.com/TiffanyGetrude/Animal-Disease-Predictor/tree/main
---

### 🏠 Pet Adoption & Lost/Found

Give every pet a chance at a loving home:

- 📢 **Post Adoptions/Lost or Found Pets**: Help lost pets reunite with their families or assist in finding homes for rescued ones.
- 🐶 **Browse Adoptions/Lost or Found**: Explore adoptable pets and bring home a new friend.

---

### 🩺 Vet Services

Your pet's health matters. Find help near you:

- 🏥 **Vet Clinics**: Locate nearby animal clinics in your area.
- 👨‍⚕️ **Veterinarians**: Connect with professional veterinarians for expert advice and care.

---

### 🐕 Community (Under development)

Join a thriving community of pet lovers:

- 💬 **Discussion Boards**: Participate in breed-specific forums, pet care Q&As, and general discussions.
- 🐾 **Share Experiences**: Post stories, ask for advice, and support others in their pet journey.

---

## 🔧 Tech Stack

> A blend of smart and scalable technologies:

- **Frontend**: React.js + Tailwind CSS  
- **Backend**: Node.js + Flask (Python)  
- **AI Models**: PyTorch (MobileNetV2 for video/image classification)  
- **Database**: MongoDB  

---
