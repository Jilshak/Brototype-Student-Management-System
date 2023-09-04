from rest_framework.viewsets import ModelViewSet
from .models import Message, Notification
from .serializers import MessageSerializer, NotificationSerializer


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    
class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer