import cv2
# import face_recognition  # Commented out - using mock implementation
import pickle
from datetime import datetime
import requests
import random

BACKEND_URL = "http://localhost:8000/attendance"

# Mock data for demonstration
MOCK_NAMES = ["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson"]

def recognize_face(frame):
    """
    Mock face recognition function
    In a real implementation, this would use face_recognition library
    """
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Simulate face detection (80% success rate)
    if random.random() < 0.8:
        # Simulate recognizing a known person
        name = random.choice(MOCK_NAMES)
    else:
        # Simulate unknown person
        name = "Unknown"

    return {"name": name, "time": now}

    # Prepare JSON
    result = {"name": name, "time": now}

    # Send to backend
    try:
        requests.post(BACKEND_URL, json=result)
    except:
        print("⚠ Could not send data to backend")

    return result
