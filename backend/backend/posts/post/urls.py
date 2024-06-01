from django.urls import path


from .views.views import get_all_posts, create_post, get_post, update_post, delete_post

urlpatterns = [
    path('posts/', get_all_posts, name='get_all_posts'),
    path('posts/create/', create_post, name='create_post'),
    path('posts/<int:post_id>/', get_post, name='get_post'),
    path('posts/<int:post_id>/update/', update_post, name='update_post'),
    path('posts/<int:post_id>/delete/', delete_post, name='delete_post')
]

