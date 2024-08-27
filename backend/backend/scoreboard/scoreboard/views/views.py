from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes
from ...models import ScoreboardEntry
from .serializer import ScoreboardEntrySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

class ScoreboardViewSet():
    queryset = ScoreboardEntry.objects.all()
    serializer_class = ScoreboardEntrySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return ScoreboardEntry.objects.all().order_by('-score', 'timestamp')
    

@api_view(['POST'])
def create_scoreboard_entry(request):
    serializer = ScoreboardEntrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_scoreboard(request):
    page = request.GET.get('page', 1)
    page_size = request.GET.get('page_size', 10)
    scoreboard = ScoreboardEntry.objects.all().order_by('-score', 'timestamp')
    paginator = Paginator(scoreboard, page_size)
    try:
        scoreboard_page = paginator.page(page)
    except PageNotAnInteger:
        scoreboard_page = paginator.page(1)
    except EmptyPage:
        scoreboard_page = paginator.page(paginator.num_pages)
    serializer = ScoreboardEntrySerializer(scoreboard_page, many=True)
    return Response({
        'results': serializer.data,
        'count': paginator.count,
        'next': scoreboard_page.has_next(),
        'previous': scoreboard_page.has_previous(),
    })

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_scoreboard_entry(request, pk):
    scoreboard_entry = ScoreboardEntry.objects.get(pk=pk)
    serializer = ScoreboardEntrySerializer(scoreboard_entry, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_scoreboard_entry(request, pk):
    scoreboard_entry = ScoreboardEntry.objects.get(pk=pk)
    scoreboard_entry.delete()
    return Response(status=204)
