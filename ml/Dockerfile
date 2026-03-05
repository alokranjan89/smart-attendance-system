# ML service Dockerfile
FROM python:3.11-slim

WORKDIR /app

# copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy all python scripts and known_faces
COPY . .

# expose Flask port
EXPOSE 5000

# entrypoint
CMD ["python", "app.py"]
