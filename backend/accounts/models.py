from datetime import datetime
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    avatar = models.ImageField(upload_to='user_avatars/', null=True, blank=True)

class MovieRecord(models.Model):
    added_date = models.DateTimeField(default=datetime.now)
    watched = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.CharField(max_length=30)
    title = models.TextField(default='')

    def __str__(self) -> str:
        return f"user: {self.user.username}, movie_id: {self.movie_id}, title: {self.title}"
