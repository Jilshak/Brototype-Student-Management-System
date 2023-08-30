from django.db import models
from users.models import User

# Create your models here.
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='message_sender')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)
    seen = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.message} - {self.sender.username}'