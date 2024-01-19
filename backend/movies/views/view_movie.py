from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests

# class MovieView():
class MovieView(View):
    def get(self, request):
        movie_id = request.GET.get('id', '')
        response = requests.get('https://tv-api.com/en/API/Title/' + settings.TV_API_KEY + '/' + movie_id)
        response = response.json()
        return JsonResponse(response)
