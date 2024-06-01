from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser, MultiPartParser
from ...models import Post
from .serializer import PostSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view, parser_classes



class PostViewSet:
    queryset = Post.objects.all()
    serializer_class = PostSerializer


@api_view(['GET'])
def get_all_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
@parser_classes([JSONParser, MultiPartParser])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        post = serializer.save()
        return JsonResponse({"id": post.id, "data": serializer.data}, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
def get_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Post does not exist'}, status=404)
    

@api_view(['PUT'])
@parser_classes([JSONParser, MultiPartParser])
def update_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Post does not exist'}, status=404)
    

@api_view(['DELETE'])
def delete_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        post.delete()
        return JsonResponse({'success': 'Post deleted successfully'}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Post does not exist'}, status=404)