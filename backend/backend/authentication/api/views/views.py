from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from .serializers import RegisterSerializer, CustomUserSerializer, LoginSerializer
from django.views.decorators.csrf import csrf_exempt
from ...models import CustomUser

@api_view(['POST'])
@csrf_exempt
def signup(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'User created successfully'}, status=201)
    return Response(serializer.errors, status=400)


    

@api_view(['POST'])
@csrf_exempt
def signin(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': 'User logged in successfully',
                'username': user.username,
                'role': user.role,
                'user_id': user.id,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=200)
        return Response({'error': 'Invalid credentials'}, status=401)
    return Response(serializer.errors, status=400)
    

@api_view(['POST'])
def signout(request):
    try:
        refresh_token = request.data.get('refresh')
        print(refresh_token, 'refresh_token')
        print(f"Received refresh token: {refresh_token}")
        if not refresh_token:
            return Response({'error': 'Please provide refresh token'}, status=400)
        token = RefreshToken(refresh_token)     
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            print(f"Error blacklisting token: {str(e)}")
            return Response({'error': f'Invalid token: {str(e)}'}, status=400)
        logout(request)
        return Response({'success': 'User logged out successfully'}, status=200)
    except Exception as e:
        print(f"Unexpected error in signout: {str(e)}")
        return Response({'error': str(e)}, status=400)
    
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user(request):
    try:
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response({'user': serializer.username, 'email': serializer.email, 'role': serializer.role}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAdminUser])
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

