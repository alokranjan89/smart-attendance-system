from flask import Flask, jsonify
from recognizer import recognize_face
from liveness import is_alive, head_turn_detected
import cv2
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "ML Attendance API is running!"

@app.route("/detect", methods=["GET"])
def detect():
    # Capture frame from webcam
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return jsonify({"name": "Camera Error", "time": ""})

    # -------------------------
    # LIVENESS DETECTION
    # -------------------------
    blink = is_alive(frame)
    head = head_turn_detected(frame)

    if not blink and not head:
        # No blink + no head movement → Spoof attempt
        return jsonify({"name": "Spoof Detected", "time": ""})

    # -------------------------
    # FACE RECOGNITION
    # -------------------------
    result = recognize_face(frame)
    return jsonify(result)


if __name__ == "__main__":
    print("Starting ML Flask Server on port 5000...")
    app.run(host="0.0.0.0", port=5000)
