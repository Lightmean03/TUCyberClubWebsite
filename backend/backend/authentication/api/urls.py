from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views.views import signup, signin, signout, user, update_user_role, get_all_users, update_user_password

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),
    path('signout/', signout, name='signout'),
    path('user/', user, name='user'),
    path('user/<int:user_id>/role/', update_user_role, name='update_user_role'),
    path('users/', get_all_users, name='users'),
    path('user/password/', update_user_password, name='update_user_password')
]
