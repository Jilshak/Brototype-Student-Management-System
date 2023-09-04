from rest_framework.routers import DefaultRouter
from .views import MessageViewSet, NotificationViewSet

router = DefaultRouter()
router.register(r'messages', MessageViewSet , basename='message_viewset')
router.register(r'notification', NotificationViewSet , basename='notification_viewset')

urlpatterns = [
    
] + router.urls
