from django.http import JsonResponse
from django.views import View
from django.conf import settings
from dotenv import load_dotenv
import requests
import os

# class MovieView():
class InTheatersView(View):
    def get(self, request):
        load_dotenv()
        params = {'api_key': os.getenv("TMDB_API_KEY")}
        response = requests.get(f'{settings.TMDB_URL}/movie/now_playing', params=params).json()
        return JsonResponse(response)
