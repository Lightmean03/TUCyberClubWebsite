from django.urls import path
from .views.views import get_calendar, create_calendar_event, update_calendar_event, delete_calendar_event


urlpatterns = [
    path('calendar/', get_calendar, name='calendar'),
    path('calendar/create', create_calendar_event, name='create_calendar_event'),
    path('calendar/<int:pk>/', update_calendar_event, name='update_calendar_event'),
    path('calendar/<int:pk>/delete/', delete_calendar_event, name='delete_calendar_event')
]


