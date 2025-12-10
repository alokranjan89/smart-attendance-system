from flask import Flask, jsonify
from recognizer import recognize_face

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "ML Attendance API is running!"

@app.route("/detect", methods=["GET"])
def detect():
    result = recognize_face()
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
