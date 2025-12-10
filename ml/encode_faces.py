import face_recognition
import os
import pickle

KNOWN_FACES_DIR = "known_faces"
ENCODINGS_FILE = "encodings.pkl"

# Ensure known_faces directory exists
if not os.path.exists(KNOWN_FACES_DIR):
    print(f"Error: {KNOWN_FACES_DIR} directory not found!")
    exit(1)

encodings = []
names = []

try:
    for filename in os.listdir(KNOWN_FACES_DIR):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            try:
                image = face_recognition.load_image_file(f"{KNOWN_FACES_DIR}/{filename}")
                face_encodings = face_recognition.face_encodings(image)
                
                if len(face_encodings) > 0:
                    encoding = face_encodings[0]
                    encodings.append(encoding)
                    names.append(os.path.splitext(filename)[0])  # filename without extension
                    print(f"Encoded: {filename}")
                else:
                    print(f"Warning: No faces found in {filename}")
            except Exception as e:
                print(f"Error encoding {filename}: {e}")
                continue
    
    if len(encodings) == 0:
        print("Warning: No face encodings found!")
    
    data = {"encodings": encodings, "names": names}
    
    with open(ENCODINGS_FILE, "wb") as f:
        pickle.dump(data, f)
    
    print(f"Encoding completed! {len(encodings)} faces encoded.")
    
except Exception as e:
    print(f"Error: {e}")
    exit(1)
