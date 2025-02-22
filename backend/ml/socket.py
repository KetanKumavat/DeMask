from models.content import ContentRequest, ContentUpdateRequest
from service.content import ContentService
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


content_service = ContentService()

FILE_NAME="default_0000000"


def predict_single_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (256, 256))
    img = img.astype(np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    prediction = classifier.predict(img)
    result = "DeepFake"
    if prediction[0][0]*100 > 95:
        result = "Real"
    print(prediction)
    return {"result":result,"score":prediction[0][0]*100}


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global FILE_NAME

    await websocket.accept()
    fake_frame_timestamps = [] 
    while True:
        try:
            data = await websocket.receive()

            if "text" in data:
                import json
                json_data = json.loads(data["text"])
                print(f"Received JSON data: {json_data}")
                video_link = json_data.get("videoLink")
                timestamp = json_data.get("timestamp")
                if not video_link or not timestamp:
                    await websocket.send_json({"error": "Missing videoLink or timestamp in JSON data"})
                    continue

                safe_video_link = sanitize_filename(video_link)
                await content_service.create_content(ContentRequest(
                    url=safe_video_link,
                    timestamp=timestamp
                ))
                FILE_NAME = f"{safe_video_link}_file_{timestamp}"
                await websocket.send_json({"message": "JSON data received", "data": json_data})
                continue

            elif "bytes" in data:
                if not FILE_NAME:
                    FILE_NAME = str(uuid.uuid1())

                file_path = f"{FILE_NAME}.jpg"
                with open(file_path, "wb") as f:
                    f.write(data["bytes"])

                prediction = predict_single_image(file_path)
                result = prediction["result"]
                safe_video_link = FILE_NAME.rsplit("_file_", 1)[0]
                print("Got link")
                print(result)
                try:
                    if prediction['score'] >50 and prediction['score'] < 60:
                        await content_service.update_content_with_scores(model=ContentUpdateRequest(
                            prediction="GreyScale",
                            score=prediction['score'],
                            approved=False
                        ),video_link=safe_video_link)
                    else:
                        await content_service.update_content_with_scores(model=ContentUpdateRequest(
                            prediction=result,
                            score=prediction['score'],
                            approved=False
                        ),video_link=safe_video_link)
                except Exception as e:
                    print(e)
                    
                
                current_time = time.time()
                if result == "DeepFake":
                    fake_frame_timestamps.append(current_time)
                    fake_frame_timestamps = [t for t in fake_frame_timestamps if current_time - t <= 20]
                    if len(fake_frame_timestamps) > 14:
                        await websocket.send_json({
                            "final_result": "Fake", 
                        })
                        print("Too may fake")

                await websocket.send_json(prediction)

            else:
                print("Received unknown message type.")
                
        except Exception as e:
            print(f"Error: {e}")
            break

        
        
def sanitize_filename(name: str) -> str:
    """
    Replace characters not allowed in filenames with underscores.
    This function removes or replaces characters like :, /, \, *, ?, ", <, >, |
    """
    import re
    return re.sub(r'[\\/*?:"<>|]', "_", name)