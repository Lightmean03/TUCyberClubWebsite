from django.urls import path
from .views.views import ScoreboardViewSet, get_scoreboard, create_scoreboard_entry, update_scoreboard_entry, delete_scoreboard_entry




urlpatterns = [
    path('scoreboard/', ScoreboardViewSet, name='scoreboard'),
    path('scoreboard/create', create_scoreboard_entry, name='scoreboard/create'),
    path('scoreboard/get_scoreboard/', get_scoreboard, name='get_scoreboard'),
    path('scoreboard/<int:pk>/', update_scoreboard_entry, name='update_scoreboard_entry'),
    path('scoreboard/<int:pk>/delete/', delete_scoreboard_entry, name='delete_scoreboard_entry')

]