from ml.mesonet import Meso4
import cv2
import numpy as np
from fastapi import APIRouter,WebSocket
from PIL import Image
import io
import time
import uuid
classifier = Meso4()
classifier.load("weights/Meso4_DF.h5")

router=APIRouter()

def predict_single_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (256, 256))
    img = img.astype(np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    prediction = classifier.predict(img)
    result = "DeepFake"
    if prediction[0][0] > 95:
        result = "Real"
    print(prediction)
    return {"result":result,"score":prediction[0][0]*100}


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            fake_frame_timestamps = []
            data = await websocket.receive_bytes()
            file_name=uuid.uuid1()
            with open(f"{file_name}.jpg", "wb") as f:
                f.write(data)
            
            prediction = predict_single_image(f"{file_name}.jpg")
            result = prediction["result"]

            timestamp = time.time()

            if result == "DeepFake":
                fake_frame_timestamps.append(timestamp)
                fake_frame_timestamps = [t for t in fake_frame_timestamps if timestamp - t <= 30]

                if len(fake_frame_timestamps) > 10:
                    await websocket.send_json({"result": "Fake", "message": "Connection closed due to too many fake frames."})
                    await websocket.close()
                    break

            await websocket.send_json(prediction)

        except Exception as e:
            print(f"Error: {e}")
            break
        
        
predict_single_image('/home/siro/Desktop/Hackanova/real.jpg')