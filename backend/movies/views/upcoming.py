from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests

# class MovieView():
class UpcomingMoviesView(View):
    def get(self, request):
        params = {'api_key': f'{settings.TMDB_API_KEY}'}
        response = requests.get(f'{settings.TMDB_URL}/movie/upcoming', params=params).json()
        return JsonResponse(response)
