from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Message
from users.serializers import UserSerializer

class MessageSerializer(ModelSerializer):
    
    class Meta:
        model = Message
        fields = '__all__'