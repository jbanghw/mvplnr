from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests

# class MovieView():
class MovieSearchView(View):
    def get(self, request):
        search_expression = request.GET.get('search', '')
        response = requests.get('https://tv-api.com/en/API/SearchMovie/' + settings.TV_API_KEY + '/' + search_expression)
        response = response.json()
        return JsonResponse(response)