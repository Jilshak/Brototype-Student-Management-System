from django.db import models
from django.contrib.auth.models import AbstractUser
from .Managers import UserManager

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
    educational_qualification = models.CharField(
        max_length=250, null=True, blank=True)
    authenticated = models.BooleanField(default=False)
    batch = models.ForeignKey(
        Batch, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to='profile')

    is_reviewer = models.BooleanField(default=False)
    is_advisor = models.BooleanField(default=False)
    is_user = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        is_new = self._state.adding  # Check if the user is being created

        super().save(*args, **kwargs)  # Call the original save method

        if is_new and not (self.is_superuser or self.is_advisor or self.is_reviewer):  # Only run this code for newly created users
            for week_number in range(1, 29):  # Create 28 weeks
                week = Week.objects.create(user=self, week_number=week_number)
                # Create WeekDetails for each week
                WeekDetails.objects.create(week=week)

    objects = UserManager()

    REQUIRED_FIELDS = []


class Week(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='weeks')
    week_number = models.PositiveIntegerField()
    completed = models.BooleanField(default=False)
    color = models.CharField(max_length=50, default='#3E4257')

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
    pending_topics = models.TextField(blank=True, null=True)
