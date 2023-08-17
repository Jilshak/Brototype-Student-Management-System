from django.contrib import admin
from .models import User, Batch, Week, WeekDetails,Booking,TimeSlot


# Register your models here.
admin.site.register(User)
admin.site.register(Batch)
admin.site.register(Week)
admin.site.register(WeekDetails)
admin.site.register(Booking)
admin.site.register(TimeSlot)
