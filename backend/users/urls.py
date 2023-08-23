from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import UserViewSet, MyTokenObtainPairView, BatchViewSet, WeekDetailViewSet, WeekViewSet,BookingViewSet,TimeSlotViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user_view')
router.register('batches', BatchViewSet, basename='batch_view')
router.register('weeks', WeekViewSet, basename='weeks_view')
router.register('week_details', WeekDetailViewSet, basename='week_detail_view')
router.register('booking', BookingViewSet, basename='booking_view')
router.register('timeslot', TimeSlotViewSet, basename='timeslot_view')


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

] + router.urls


