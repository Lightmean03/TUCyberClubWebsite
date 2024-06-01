from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib import admin

# Create your models here.

class CustomUser(AbstractUser):
    Roles = (
        ('admin', 'admin'),
        ('user', 'user'),
    )

    role = models.CharField(max_length=5, choices=Roles, default='user')
    def __str__(self):
        return self.username
    
    

admin.site.register(CustomUser)