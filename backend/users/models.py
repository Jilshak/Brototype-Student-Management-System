from django.db import models
from django.contrib.auth.models import AbstractUser
from .Managers import UserManager
from datetime import datetime, timedelta

# Create your models here.


class Batch(models.Model):
    
    batch_number = models.IntegerField(unique=True, blank=True, null=True)

    def __str__(self):
        return str(self.batch_number)


class User(AbstractUser):
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=250, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=10, unique=True, null=True)
    guardians_name = models.CharField(max_length=250, null=True, blank=True)
    guardians_number = models.CharField(max_length=250, null=True, blank=True)
    aadhar_number = models.CharField(max_length=16, blank=True, null=True)
    village = models.CharField(max_length=100, blank=True, null=True)
    taluk = models.CharField(max_length=100, blank=True, null=True)
    domain = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=300, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    mother_name = models.CharField(max_length=100, blank=True, null=True)
    educational_qualification = models.CharField(
        max_length=250, null=True, blank=True)
    authenticated = models.BooleanField(default=False)
    batch = models.ForeignKey(
        Batch, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to='profile')
    review_in = models.IntegerField(blank=True, default=7)
    current_week = models.IntegerField(blank=True, default=1)
    review_scheduled = models.BooleanField(default=False)
    
    # notification and chats count
    notification_count = models.PositiveIntegerField(default=0)
    chat_count = models.PositiveIntegerField(default=0)

    is_reviewer = models.BooleanField(default=False)
    is_advisor = models.BooleanField(default=False)
    is_user = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        is_new = self._state.adding  # Check if the user is being created
        
        

        super().save(*args, **kwargs)  # Call the original save method

        # Only run this code for newly created users
        if is_new and not (self.is_superuser or self.is_advisor or self.is_reviewer):
           
            days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            count = 0
            for week_number in range(1, 29):  # Create 28 weeks
                if (datetime.today() + timedelta(days=count)).weekday() != 5:  
                    week = Week.objects.create(user=self, week_number=week_number)
                    count += 8
                    scheduled_date = datetime.today() + timedelta(days=count)
                    day_name = days[int(scheduled_date.weekday())]
                elif (datetime.today() + timedelta(days = count)).weekday() == 5:
                    week = Week.objects.create(user=self, week_number=week_number)
                    count += 9
                    scheduled_date = datetime.today() + timedelta(days=count)
                    day_name = days[int(scheduled_date.weekday())]
                
                WeekDetails.objects.create(week=week, scheduled_date=scheduled_date, day_name=day_name)


    objects = UserManager()

    REQUIRED_FIELDS = []


class Week(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='weeks')
    week_number = models.PositiveIntegerField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.week_number)


class WeekDetails(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE)
    Marks = models.IntegerField(blank=True, null=True)
    advisor = models.CharField(max_length=250, null=True, blank=True)
    reviewer = models.CharField(max_length=250, blank=True, null=True)
    conducted_on = models.DateField(blank=True, null=True)
    audio_task = models.BooleanField(default=False)
    description = models.BooleanField(default=False)
    typing = models.BooleanField(default=False)
    seminar_presentation = models.BooleanField(default=False)
    feedback = models.BooleanField(default=False)
    progress = models.BooleanField(default=False)
    pending_topics = models.CharField(max_length=500, blank=True, null=True)
    scheduled_date = models.DateField(null=True, blank=True)
    day_name = models.CharField(max_length=50, null=True, blank=True)
    this_weeks_tasks = models.FileField(upload_to='weekly_task', null=True, blank=True)
    miscellenous_tasks = models.FileField(upload_to='miscellenous_task', null=True, blank=True)
    personal_tasks = models.FileField(upload_to='personal_task', null=True, blank=True)
    technical_tasks = models.FileField(upload_to='technical_tasks', null=True, blank=True)


class TimeSlot(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_time')
    day = models.CharField(max_length=250)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    booked = models.BooleanField(default=False)

    def __str__(self):
        a = f'{self.user}- {self.date} - {self.day} - {self.start_time} - {self.end_time}'
        return a


class Booking(models.Model):
    intern = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='intern_name')
    advisor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='advisor')
    slot = models.ForeignKey(
        TimeSlot, on_delete=models.CASCADE, related_name='booked_slot')
    booked_at = models.DateTimeField(auto_now_add=True)

    intern_username = models.CharField(max_length=255, blank=True, null=True)
    intern_batch = models.CharField(max_length=255, blank=True, null=True)
    advisor_username = models.CharField(max_length=255, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.intern_username = self.intern.username
        self.intern_batch = self.intern.batch
        self.advisor_username = self.advisor.username
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.slot)
