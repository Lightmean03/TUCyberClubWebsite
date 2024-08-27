from rest_framework import viewsets
from ...models import Attendance
from .serializer import AttendanceSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes




class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all().order_by('-timestamp')
    serializer_class = AttendanceSerializer


@api_view(['GET'])
def get_all_attendance(request):
    attendance = Attendance.objects.all()
    serializer = AttendanceSerializer(attendance, many=True)
    return JsonResponse(serializer.data, safe=False)



@api_view(['POST'])
def create_attendance(request):
    serializer = AttendanceSerializer(data=request.data)
    if serializer.is_valid():
        attendance = serializer.save()
        return JsonResponse({"id": attendance.id, "data": serializer.data}, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_attendance(request, pk):
    attendance = Attendance.objects.get(pk=pk)
    serializer = AttendanceSerializer(attendance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
