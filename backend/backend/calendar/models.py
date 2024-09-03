from django.db import models
from django.contrib import admin

class Calendar(models.Model):
    title = models.CharField(max_length=200)
    start = models.DateTimeField()
    end = models.DateTimeField()
    allDay = models.BooleanField(default=False)


admin.site.register(Calendar)
