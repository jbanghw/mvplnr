from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests

# class MovieView():
class PopularMoviesView(View):
    def get(self, request):
        response = requests.get('https://imdb-api.com/en/API/MostPopularMovies/' + settings.IMDB_API_KEY)
        response = response.json()
        return JsonResponse(response)
