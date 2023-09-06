from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from .models import Message, Notification
from users.models import User
from asgiref.sync import sync_to_async
from django.contrib.auth import get_user_model


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        # this is a nested dictionary and it will return the room_id which we are passing through the url
        current_user_id = self.scope['url_route']['kwargs']['id']
        # other_user_id = int(self.scope['query_string'])
        # print(other_user_id)

        self.room_id = current_user_id
        self.room_group_name = f'chat_{self.room_id}'

        # the channel_layer.group_add() takes two arguments
        # the name of the group to add the connection to --> self.room_group_name
        # and the name of the websocket connection ---> self.channel_name
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await super().disconnect(close_code)

    async def receive(self, text_data=None):
        data = json.loads(text_data)
        message = data["message"]
        sender_username = data["sender_username"]
        receiver_id = data['receiver_id']

        print("This is the receiver id: ", receiver_id)

        await self.save_message(
            sender=sender_username, receiver=receiver_id, message=message, thread_name=self.room_group_name
        )

        print("This is the channel group name: ", self.room_group_name)

        # Send the message to the channel layer
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "senderUsername": sender_username,
                "receiver_id": receiver_id,
            },
        )

    async def chat_message(self, event):
        print("Its entering here alright!!!")

        message = event["message"]
        username = event["senderUsername"]
        receiver = event["receiver_id"]

        await self.send(
            text_data=json.dumps(

                {
                    "message": message,
                    "senderUsername": username,
                    "receiver_id": receiver,
                }
            ),

        )

    @database_sync_to_async
    def save_message(self, sender, receiver, message, thread_name):
        receiver_instance = User.objects.get(id=int(receiver))
        user_instance = User.objects.get(username=sender)

        Message.objects.create(
            sender=user_instance, receiver=receiver_instance, message=message, thread_name=thread_name)


class NotificationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        current_user_id = self.scope['url_route']['kwargs']['id']
        self.room_id = current_user_id
        self.room_group_name = f'noti_{self.room_id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await super().disconnect(close_code)

    async def receive(self, text_data=None):
        data = json.loads(text_data)
        message = data["message"]
        sender_username = data["sender_username"]
        
        await self.save_notification(
            sender=sender_username, message=message, thread_name=self.room_group_name
        )
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "notification_message",
                "message": message,
                "senderUsername": sender_username,
            },
        )
        
    async def notification_message(self, event):
        print("Its entering here alright!!!")

        message = event["message"]
        username = event["senderUsername"]

        await self.send(
            text_data=json.dumps(

                {
                    "message": message,
                    "senderUsername": username,
                }
            ),

        )
    # @database_sync_to_async
    # def save_notification(self, sender, message, thread_name):
    #     user_instance = User.objects.get(username=sender)
    #     user_instance.notification_count += 1
    #     user_instance.save()

    #     Notification.objects.create(
    #         sender=user_instance, message=message, thread_name=thread_name)
    @database_sync_to_async
    def save_notification(self, sender, message, thread_name):
        user_instance = User.objects.get(username=sender)

        # Create the notification first
        notification = Notification.objects.create(
            sender=user_instance, message=message, thread_name=thread_name
        )

        # Increment and save the user's notification count
        if (thread_name == 'noti_36_1'):
            users_to_send = User.objects.filter(batch__isnull=False)
            
            for user_instance in users_to_send:
                user_instance.notification_count += 1
                user_instance.save()
                
                
        if (thread_name == 'noti_36_2'):
            users_to_send = User.objects.filter(is_advisor=True)
            
            for user_instance in users_to_send:
                user_instance.notification_count += 1
                user_instance.save()
                

        if (thread_name == 'noti_36_3'):
            users_to_send = User.objects.filter(is_reviewer=True)
            
            for user_instance in users_to_send:
                user_instance.notification_count += 1
                user_instance.save()
                
                
        if (thread_name == 'noti_36_123'):
            users_to_send = User.objects.all()
            
            for user_instance in users_to_send:
                user_instance.notification_count += 1
                user_instance.save()

        # Return the created notification
        return notification

