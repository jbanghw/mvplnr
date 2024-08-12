from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests

# class MovieView():
class InTheatersView(View):
    def get(self, request):
        params = {'api_key': f'{settings.TMDB_API_KEY}'}
        response = requests.get(f'{settings.TMDB_URL}/movie/now_playing', params=params).json()
        return JsonResponse(response)
