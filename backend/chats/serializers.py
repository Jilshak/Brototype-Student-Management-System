from rest_framework.serializers import ModelSerializer
from .models import Message, Notification

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        
class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'