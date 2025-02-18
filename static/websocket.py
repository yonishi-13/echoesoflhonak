import asyncio
import websockets
import random
import json
from datetime import datetime

async def weather_data(websocket, path):
    while True:
        # Simulate data generation
        data = {
            "temperature": round(random.uniform(15, 30), 2),
            "humidity": round(random.uniform(40, 80), 2),
            "pressure": round(random.uniform(980, 1020), 2),
            "altitude": round(random.uniform(1000, 3000), 2),
            "wind_speed": round(random.uniform(0, 15), 2),
            "wind_direction": random.randint(0, 360)  # Wind direction in degrees
        }
        
        # Send data as a JSON string
        await websocket.send(json.dumps(data))
        
        # Wait for a second before sending new data
        await asyncio.sleep(1)

async def main():
    async with websockets.serve(weather_data, "localhost", 5002):
        await asyncio.Future()  # Run forever

# Run the WebSocket server
asyncio.run(main())
