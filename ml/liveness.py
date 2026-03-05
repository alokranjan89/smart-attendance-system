import cv2
import numpy as np
import face_recognition
from scipy.spatial import distance as dist

# ---------------------------
# PART 1 — BLINK DETECTION
# ---------------------------

def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    return (A + B) / (2.0 * C)

def is_alive(frame):
    rgb_frame = frame[:, :, ::-1]
    face_landmarks_list = face_recognition.face_landmarks(rgb_frame)

    if not face_landmarks_list:
        return False

    landmarks = face_landmarks_list[0]

    left_eye = landmarks["left_eye"]
    right_eye = landmarks["right_eye"]

    leftEAR = eye_aspect_ratio(left_eye)
    rightEAR = eye_aspect_ratio(right_eye)

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
