import os
from django.core.asgi import get_asgi_application
from django.urls import re_path
from chats.consumers import ChatConsumer
from channels.routing import ProtocolTypeRouter, URLRouter


from .routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket':
        URLRouter(
            routes= websocket_urlpatterns
        ),
    
})