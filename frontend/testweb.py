import asyncio
import random
import websockets
import json

async def handler(websocket, path):
    while True:
        data = [
            {
                "name": "Твоя маса",
                "number":random.randint(0, 1000)
            },
            {
                "name": "Моя маса",
                "number":random.randint(0, 1000)
            },
        ]
        await websocket.send(json.dumps(data))
        await asyncio.sleep(1)

start_server = websockets.serve(handler, "127.0.0.1", 8888)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()