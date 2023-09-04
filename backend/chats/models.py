from django.db import models
from users.models import User

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender', null=True, blank=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver',null=True, blank=True)
    thread_name = models.CharField(max_length=200, null=True, blank=True)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.username}-{self.thread_name}' if self.sender else f'{self.message}-{self.thread_name}'

class Notification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    thread_name = models.CharField(max_length=200, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_seem = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.sender.username}-{self.timestamp}'