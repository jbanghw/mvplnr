from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests

# class MovieView():
class InTheatersView(View):
    def get(self, request):
        response = requests.get('https://tv-api.com/en/API/InTheaters/' + settings.TV_API_KEY)
        response = response.json()
        return JsonResponse(response)
