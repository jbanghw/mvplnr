from django.http import JsonResponse
from django.views import View
from django.conf import settings
from dotenv import load_dotenv
import requests
import os

# class MovieView():
class MovieView(View):
    def get(self, request):
        movie_id = request.GET.get('id', '')
        load_dotenv()
        params = {'api_key': os.getenv("TMDB_API_KEY")}
        response = requests.get(f'{settings.TMDB_URL}/movie/{movie_id}', params=params).json()
        return JsonResponse(response)
