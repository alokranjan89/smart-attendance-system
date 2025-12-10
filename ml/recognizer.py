import cv2
import face_recognition
import pickle
from datetime import datetime
import requests

BACKEND_URL = "http://localhost:8000/attendance"

# Load encodings
with open("encodings.pkl", "rb") as f:
    data = pickle.load(f)

def recognize_face():
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return {"name": "Camera Error", "time": ""}

    rgb_frame = frame[:, :, ::-1]

    locations = face_recognition.face_locations(rgb_frame)
    encodings = face_recognition.face_encodings(rgb_frame, locations)

    name = "Unknown"
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    for face_encoding in encodings:
        distances = face_recognition.face_distance(data["encodings"], face_encoding)
        min_distance = min(distances)
        min_index = distances.tolist().index(min_distance)

        if min_distance < 0.50:
            name = data["names"][min_index]

    # Prepare JSON
    result = {"name": name, "time": now}

    # Send to backend
    try:
        requests.post(BACKEND_URL, json=result)
    except:
        print("⚠ Could not send data to backend")

    return result
