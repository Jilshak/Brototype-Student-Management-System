from django.db import models
from django.contrib.auth.models import AbstractUser
from .Managers import UserManager

# Create your models here.
class Batch(models.Model):
    batch_number = models.IntegerField(unique=True, blank=True, null=True)
    
    def __str__(self):
        return str(self.batch_number)



# Create your models here.
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
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to='profile')
    
    is_reviewer = models.BooleanField(default=False)
    is_advisor = models.BooleanField(default=False)
    is_user = models.BooleanField(default=True)

    objects = UserManager()
    

    REQUIRED_FIELDS = []
    