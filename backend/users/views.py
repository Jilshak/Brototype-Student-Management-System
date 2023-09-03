from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer, BatchSerializer, WeekSerializer, WeekDetailsSerializer, BookingSerializer,TimeSlotSerializer
from .models import User, Batch, Week, WeekDetails, Booking, TimeSlot
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, TimeSlot
from django.db.models import Q
from rest_framework.decorators import action

# Create your views here.


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
class BatchViewSet(ModelViewSet):
    serializer_class = BatchSerializer
    queryset = Batch.objects.all()
    
class WeekViewSet(ModelViewSet):
    serializer_class = WeekSerializer
    queryset = Week.objects.all()
    
class WeekDetailViewSet(ModelViewSet):
    serializer_class = WeekDetailsSerializer
    queryset = WeekDetails.objects.all()

class BookingViewSet(ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    
class TimeSlotViewSet(ModelViewSet):
    serializer_class = TimeSlotSerializer
    queryset = TimeSlot.objects.all()
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        
        token['is_superuser'] = user.is_superuser
        token['is_advisor'] = user.is_advisor
        token['is_reviewer'] = user.is_reviewer
        token['is_user'] = user.is_user
        token['username'] = user.username
        token['authenticated'] = user.authenticated
        

        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    


# class ScheduledViewSet(viewsets.ViewSet):

#     @action(detail=False, methods=['GET'])
#     def combined_filtered_data(self, request):
#         reviewer_id = request.query_params.get('reviewer_id')
#         advisor_id = request.query_params.get('advisor_id')
#         intern_id = request.query_params.get('intern_id')
#         # Similarly, retrieve other query parameters

#         # Use the query parameters to filter data
#         time_slots = TimeSlot.objects.filter(Q(id=reviewer_id) & Q(booked=True))
#         advisors = User.objects.filter(id=advisor_id) if advisor_id else User.objects.filter(is_advisor = True)
#         interns = User.objects.filter(id=intern_id) if intern_id else User.objects.filter(Q(is_user = True) & Q(is_superuser = False) & Q(is_advisor = False) & Q(is_reviewer = False))

#         combined_data = {
#             'time_slots': time_slots,
#             'advisors': advisors,
#             'interns': interns,
#         }
#         serializer = ScheduledSerialize(combined_data)

#         return Response(serializer.data)