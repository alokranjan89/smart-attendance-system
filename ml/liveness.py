import cv2
import random

def is_alive(frame):
    """
    Mock blink detection
    In a real implementation, this would analyze eye aspect ratios
    """
    # Simulate blink detection (70% success rate)
    return random.random() < 0.7

def head_turn_detected(frame):
    """
    Mock head movement detection
    In a real implementation, this would analyze facial landmarks
    """
    # Simulate head movement detection (60% success rate)
    return random.random() < 0.6

    EAR = (leftEAR + rightEAR) / 2.0

    # Threshold for blink
    if EAR < 0.20:
        return True  # blink happened

    return False


# ---------------------------
# PART 2 — HEAD MOVEMENT DETECTION
# ---------------------------

def head_turn_detected(frame):
    rgb_frame = frame[:, :, ::-1]
    face_landmarks_list = face_recognition.face_landmarks(rgb_frame)

    if not face_landmarks_list:
        return False

    nose = face_landmarks_list[0]["nose_bridge"]

    # Compare first and last nose points
    movement = abs(nose[0][0] - nose[-1][0])

    # Threshold — adjust if needed
    if movement > 5:
        return True  # head movement detected

    return False
