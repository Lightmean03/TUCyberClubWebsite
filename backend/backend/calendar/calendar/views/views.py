from rest_framework import viewsets
from ...models import Calendar
from .serializers import CalendarSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class CalendarViewSet(viewsets.ModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
def get_calendar(request):
    queryset = Calendar.objects.all()
    serializer = CalendarSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_calendar_event(request):
    serializer = CalendarSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
def update_calendar_event(request, pk):
    event = get_object_or_404(Calendar, pk=pk)
    serializer = CalendarSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_calendar_event(request, pk):
    event = get_object_or_404(Calendar, pk=pk)
    event.delete()
    return Response(status=204)