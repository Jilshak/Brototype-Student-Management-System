from rest_framework import serializers
from .models import User, Batch, Week, WeekDetails


class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Batch
        
        
class WeekDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = WeekDetails
        
class WeekSerializer(serializers.ModelSerializer):
    weekdetails_set = WeekDetailsSerializer(many=True, read_only=True)
    
    class Meta:
        fields = '__all__'
        model = Week
        
class UserSerializer(serializers.ModelSerializer):
    
    weeks = WeekSerializer(many=True, read_only=True)
    
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