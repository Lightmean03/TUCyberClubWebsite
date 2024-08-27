from django.urls import path
from .views.views import get_all_attendance, create_attendance, update_attendance



urlpatterns = [
    path('attendance/', get_all_attendance, name='get_all_attendance'),
    path('attendance/create/', create_attendance, name='create_attendance'),
    path('attendance/<int:pk>/', update_attendance, name='update_attendance')
]