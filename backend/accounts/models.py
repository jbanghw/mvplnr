from datetime import datetime
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class User(AbstractUser):
    avatar = models.ImageField(upload_to='user_avatars/', null=True, blank=True)
    # future_watch = models.JSONField(null=True, blank=True)
    # watched = models.JSONField(null=True, blank=True)

class MovieRecord(models.Model):
    added_date = models.DateTimeField(default=datetime.now)
    watched_date = models.DateField(null=True, blank=True)
    watched = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.CharField(max_length=30)
    title = models.TextField(default='')

    def __str__(self) -> str:
        return f"user: {self.user.username}, movie_id: {self.movie_id}, title: {self.title}"

class Review(models.Model):
    rating = models.IntegerField(
        default=5,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ]
    )
    title = models.CharField(max_length=100)
    content = models.TextField(null=True, blank=True)
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    private = models.BooleanField(default=False)
