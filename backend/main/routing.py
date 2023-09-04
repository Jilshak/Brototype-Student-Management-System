from django.urls import re_path
from chats.consumers import ChatConsumer, NotificationConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<id>\w+)/$', ChatConsumer.as_asgi()),
    re_path(r'ws/notification/(?P<id>\w+)/$', NotificationConsumer.as_asgi()),
]
