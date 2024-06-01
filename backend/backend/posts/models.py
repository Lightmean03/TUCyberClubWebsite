from django.db import models
from django.contrib import admin


class Post(models.Model):
    user = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE,)
    ranking = models.IntegerField(default=0)
    teamname = models.CharField(max_length=100)
    score = models.IntegerField(default=0)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.teamname


admin.site.register(Post)


