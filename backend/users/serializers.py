from rest_framework import serializers
from .models import User, Batch


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = User

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Batch