from django.db import models
from django.contrib.auth import get_user_model
from django.contrib import admin

User = get_user_model()
class ScoreboardEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    score = models.IntegerField()
    teamname = models.CharField(max_length=100)
    ranking = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:  
            super().save(*args, **kwargs)
            self.update_rankings()
        else:
            super().save(*args, **kwargs)

    @classmethod
    def update_rankings(cls):
        entries = cls.objects.all().order_by('-score', 'timestamp')
        for index, entry in enumerate(entries, start=1):
            if entry.ranking != index:
                entry.ranking = index
                cls.objects.filter(pk=entry.pk).update(ranking=index)


admin.site.register(ScoreboardEntry)