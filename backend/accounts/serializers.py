from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.models import Review, MovieRecord

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'avatar',
        ]

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'password',
            'first_name',
            'last_name',
            'email',
            'avatar',
        ]

class MovieRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieRecord
        fields = ['added_date', 'watched_date', 'watched', 'user', 'movie_id', 'title']