from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import tensorflow as tf
import io

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set your frontend origin in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load TFLite model
interpreter = tf.lite.Interpreter(model_path='/assests/models/plant_disease_model.tflite')
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Load labels
with open("labels.txt", "r") as f:
    labels = [line.strip() for line in f.readlines()]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).resize((128, 128))
    img_array = np.array(image).astype(np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = (img_array - 127.5) / 127.5  # normalize if needed

    interpreter.set_tensor(input_details[0]['index'], img_array)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    top_result = np.argmax(output_data[0])
    confidence = float(output_data[0][top_result])
    return {
        "label": labels[top_result],
        "confidence": confidence
    }
