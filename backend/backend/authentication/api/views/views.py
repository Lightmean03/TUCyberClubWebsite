from rest_framework.decorators import api_view, permission_classes as rest_decorators
from rest_framework.response import Response
from rest_framework_simplejwt import serializers as jwt_serializers, views as jwt_views, exceptions as jwt_exceptions
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.exceptions import ValidationError
from rest_framework import exceptions as rest_exceptions, decorators as rest_decorators, permissions as rest_permissions
from django.middleware import csrf
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, CustomUserSerializer, LoginSerializer
from ...models import CustomUser
from django.conf import settings
from django_ratelimit.decorators import ratelimit

def get_user_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
@ratelimit(key='ip', rate='1/m', method='POST', block=True)
def signup(request):
    serializer = RegisterSerializer(data=request.data)
    role = request.data.get('role', 'user')
    if serializer.is_valid(raise_exception=True):
        if role != 'user':
            return Response({'error': 'Only "user" role can be created'}, status=403)
        try:
            serializer.save()
            return Response({'success': 'User created successfully'}, status=201)
        except ValidationError as e:
            return Response({'error': str(e)}, status=400)
    return Response({'error': 'Permission denied', 'details': serializer.errors}, status=400)

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def signin(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    username = serializer.validated_data["username"]
    password = serializer.validated_data["password"]

    user = authenticate(username=username, password=password)

    if user is not None:
        tokens = get_user_tokens(user)
        response = Response()
        response.set_cookie(key=settings.SIMPLE_JWT['AUTH_COOKIE'], value=tokens["access"], httponly=True)
        response.set_cookie(key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], value=tokens["refresh"], httponly=True)

        response.data = {
            "access": tokens["access"],
            "refresh": tokens["refresh"],
            "csrftoken": csrf.get_token(request),
            "user": user.username,
            "role": user.role,
            "email": user.email,
        }
        return response
    raise Exception.AuthenticationFailed("Email or Password is incorrect!")

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def signout(request):
    response = Response()
    response.delete_cookie(key=settings.SIMPLE_JWT['AUTH_COOKIE'])
    response.delete_cookie(key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
    response.data = {
        "success": "Logged out successfully"
    }
    return response







@api_view(['GET'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response({'user': serializer.username, 'email': serializer.email, 'role': serializer.role}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refreshToken')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)
    

@api_view(['PUT'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def update_user_role(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        role = request.data.get('role')

        if role not in ['admin', 'user']:
            return Response({'error': 'Invalid role'}, status=400)
        user.role = role
        user.save()
        return Response({'success': 'Role updated successfully'}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)



@api_view(['GET'])
def get_all_users(request):
    try:
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response({'error': 'You are not authorized to view this page'}, status=403)
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response({'users': serializer.data}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def update_user_password(request):
    try:
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Password updated successfully'}, status=200)
        return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

