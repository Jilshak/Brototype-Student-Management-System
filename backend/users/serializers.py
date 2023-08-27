from rest_framework import serializers
from .models import User, Batch, Week, WeekDetails, Booking, TimeSlot


class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Batch


class WeekDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = WeekDetails

    def update(self, instance, validated_data):
        # Check if 'this_weeks_tasks' is being updated
        if 'this_weeks_tasks' in validated_data and instance.this_weeks_tasks:
            # Delete the old file if it exists
            instance.this_weeks_tasks.delete(save=False)
        if 'technical_tasks' in validated_data and instance.technical_tasks:
            # Delete the old file if it exists
            instance.technical_tasks.delete(save=False)
        if 'personal_tasks' in validated_data and instance.personal_tasks:
            # Delete the old file if it exists
            instance.personal_tasks.delete(save=False)
        if 'miscellenous_tasks' in validated_data and instance.miscellenous_tasks:
            # Delete the old file if it exists
            instance.miscellenous_tasks.delete(save=False)

        # Continue with the update process
        instance = super().update(instance, validated_data)
        return instance


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


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = TimeSlot


class BookingSerializer(serializers.ModelSerializer):

    intern_username = serializers.ReadOnlyField(source='intern.username')
    intern_batch = BatchSerializer(source='intern.batch', read_only=True)
    advisor_username = serializers.ReadOnlyField(source='advisor.username')

    class Meta:
        fields = '__all__'
        model = Booking
