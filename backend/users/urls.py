from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import UserViewSet, MyTokenObtainPairView, BatchViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserViewSet, basename='user_view')
router.register('batches', BatchViewSet, basename='batch_view')


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

] + router.urls