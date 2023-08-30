from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Message
from users.serializers import UserSerializer

class MessageSerializer(ModelSerializer):
    sender = SerializerMethodField()
    
    class Meta:
        model = Message
        fields = '__all__'
        
    def get_sender(self, obj):
        return UserSerializer(obj.sender).data