import asyncio
import websockets
import os

async def send_image():
    uri ="ws://3ce5-123-252-147-173.ngrok-free.app/ml/ws"
    
    try:
        async with websockets.connect(uri) as websocket:
            while True:
                if os.path.exists("real.jpg"):
                    with open("real.jpg", "rb") as image_file:
                        image_data = image_file.read()
                        await websocket.send(image_data)
                        response = await websocket.recv()
                        print(response)
                
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection closed: {e}")

# Run the async function
asyncio.run(send_image())
