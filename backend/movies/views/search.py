from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests

# class MovieView():
class MovieSearchView(View):
    def get(self, request):
        search_expression = request.GET.get('search', '')
        params = {'api_key': f'{settings.TMDB_API_KEY}', 'query': search_expression}
        response = requests.get(f'{settings.TMDB_URL}/search/movie', params=params).json()
        return JsonResponse(response)