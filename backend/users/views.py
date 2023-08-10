from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer, BatchSerializer
from .models import User, Batch
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
class BatchViewSet(ModelViewSet):
    serializer_class = BatchSerializer
    queryset = Batch.objects.all()
    
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        
        token['is_superuser'] = user.is_superuser
        token['is_advisor'] = user.is_advisor
        token['is_reviewer'] = user.is_reviewer
        token['is_user'] = user.is_user
        

        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer