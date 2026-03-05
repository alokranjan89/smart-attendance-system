📘 **Smart Attendance System (AI + ML + MERN + DevOps)**

An AI-powered smart attendance system that uses **Real-time Face Recognition** to automatically detect a person and store attendance in a secure database.
This project demonstrates **Machine Learning, Full-Stack Development, Microservices, DevOps, Docker, and Cloud deployment concepts**.

---

# 🚀 **Features**

* 🎯 **Real-time Face Recognition** using Python + OpenCV + face_recognition
* 🤖 **ML Microservice** exposed as a Flask REST API
* 🔐 **Liveness Detection (Anti-Spoofing)**

  * Blink detection (EAR algorithm)
  * Micro head movement detection
  * Prevents cheating via photos/screens
* 🗄️ **Backend API** built with Node.js + Express
* 💾 **Attendance stored in MongoDB**
* ⚡ **React Frontend Dashboard** (real-time updates)
* 🐳 **Containerized with Docker**
* ☸️ **Deployable on Kubernetes**
* 🔄 **CI/CD using GitHub Actions**

---

# 🆕 **NEW FEATURE: Liveness Detection (Anti-Spoofing)**

To prevent users from cheating the system using **passport photos, printed photos, or mobile screens**, the ML model now includes **Liveness Detection**.

Attendance is stored **ONLY if a real human is detected**.

---

## ✔ Blink Detection (EAR – Eye Aspect Ratio)

* Detects natural blinking using facial landmarks
* Fake images/screens do not blink
* If EAR < **0.20**, blink detected → **Real human**

---

## ✔ Head Movement Detection (Micro nose movement)

* Detects left/right micro head movement
* Photos/screens remain perfectly still
* If nose keypoints shift > **5px**, movement detected → **Real human**

---

## ✔ Final Rule

```
If (blink detected OR head movement detected):
      → Allow face recognition + save attendance
Else:
      → Return "Spoof Detected" (no attendance saved)
```

---

# 🧠 **System Architecture **

```
+---------------------+        +----------------------+        +---------------------+
|  Face Recognition   | -----> |   Node.js Backend    | -----> |     MongoDB         |
|  (Python + Flask)   |        |   (API + Mongoose)   |        |  (Database Storage) |
+---------------------+        +----------------------+        +---------------------+
                                     ↑
                                     |
                              React Frontend
                           (Live Attendance View)
```

---

# 📁 **Project Structure**

```
attendance/
│
├── backend/               → Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── ml/                    → Machine Learning microservice
│   ├── known_faces/
│   ├── encodings.pkl
│   ├── app.py             → Flask API + Liveness + Recognition
│   ├── recognizer.py      → Face matching + backend communication
│   ├── liveness.py        → Blink + head-movement detection
│   ├── encode_faces.py    → Converts images → encodings.pkl
│   └── requirements.txt
│
├── fronted/ (or frontend) → React.js dashboard
│   └── src/App.js
│
└── README.md
```

---

# 🧪 **Tech Stack**

### **Machine Learning**

* Python
* OpenCV
* face_recognition library
* Flask API

### **Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

### **Frontend**

* React.js
* Axios
* Modern UI Table

---

# � **Docker Setup**

A `docker-compose.yml` configures all three services plus MongoDB. Make sure Docker Desktop (or Docker Engine) is running.

1. **Build & start everything**

   ```bash
   docker compose up --build
   ```

   - frontend → `http://localhost:3000`
   - backend  → `http://localhost:8000`
   - ml service → `http://localhost:5000`
   - MongoDB  → `mongodb://localhost:27017/attendance`

2. **Stop / remove containers**

   ```bash
   docker compose down
   ```

> ⚠️ The ML container requires camera access. On Linux use `--device /dev/video0:/dev/video0` or run in privileged mode. Windows/macOS need extra setup (e.g., use host as the video source or send frames via API).

---

# �🔥 **How to Run the Project**

## 1️⃣ Run Machine Learning Service (Flask API)

```
cd attendance/ml
pip install -r requirements.txt
python encode_faces.py
python app.py
```

ML runs on
👉 [http://127.0.0.1:5000/detect](http://127.0.0.1:5000/detect)

---

## 2️⃣ Run Backend (Node.js + MongoDB)

```
cd attendance/backend
npm install
```

Add `.env`:

```
MONGO_URI=mongodb://localhost:27017/attendance
PORT=8000
```

Start backend:

```
node src/server.js
```

---

## 3️⃣ Run Frontend

```
cd attendance/fronted
npm install
npm start
```

Runs on:
👉 [http://localhost:3000](http://localhost:3000)

---

# 🔗 **API Endpoints**

### ML Service

| Method | Endpoint  | Description                           |
| ------ | --------- | ------------------------------------- |
| GET    | `/detect` | Face recognition + liveness detection |

### Backend Service

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| POST   | `/attendance` | Save attendance  |
| GET    | `/attendance` | Fetch attendance |

---

# 🏆 **Author**

**Alok Ranjan**
Smart Attendance System — AI + ML + MERN + DevOps
