from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests

# class MovieView():
class MovieView(View):
    def get(self, request):
        movie_id = request.GET.get('id', '')
        params = {'api_key': f'{settings.TMDB_API_KEY}'}
        response = requests.get(f'{settings.TMDB_URL}/movie/{movie_id}', params=params).json()
        return JsonResponse(response)
