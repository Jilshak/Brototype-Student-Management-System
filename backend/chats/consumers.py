from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .models import Message
import json

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print(self.scope["user"].username)
        print(self.scope["user"].email)

    async def disconnect(self, close_code):
        ...
 
    async def receive_json(self, message):
        command = message.get("command")
        if command == "Say hello !":
            print(message["data_string"])
            await self.send_json({
                "command_response": "The command to \
                say hello was received ",
                "data_string_bacK": message.get
              ("data_string", None)
            })
        
    # async def connect(self):
    #     # Get user information and establish a WebSocket connection
    #     self.user = self.scope["user"]
    #     self.room_name = f"chat_{self.user.id}"
    #     self.room_group_name = f"chat_{self.user.id}"

    #     await self.channel_layer.group_add(self.room_group_name, self.channel_name)

    #     await self.accept()

    # async def disconnect(self, close_code):
    #     # Remove the user from the group when the WebSocket connection is closed
    #     await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # async def receive(self, text_data):
    #     # Receive a message from the WebSocket
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json["message"]

    #     # Save the message to the database and send it to the group
    #     await self.create_message(message)
    #     await self.send_message(message)

    # async def create_message(self, message):
    #     # Create a new message instance and save it to the database
    #     await Message.objects.create(sender=self.user, message=message)

    # async def send_message(self, message):
    #     # Send the message to the group
    #     await self.channel_layer.group_send(
    #         self.room_group_name,
    #         {"type": "chat.message", "message": message}
    #     )

    # async def chat_message(self, event):
    #     # Send the received message to the WebSocket
    #     message = event["message"]
    #     await self.send(text_data=json.dumps({"message": message}))
