from django.http import JsonResponse
from django.views import View
from django.conf import settings
from dotenv import load_dotenv
import requests
import os

# class MovieView():
class MovieSearchView(View):
    def get(self, request):
        search_expression = request.GET.get('search', '')
        load_dotenv()
        params = {'api_key': os.getenv("TMDB_API_KEY"), 'query': search_expression}
        response = requests.get(f'{settings.TMDB_URL}/search/movie', params=params)

        if not response.ok:
            return JsonResponse({'status': False, 'message': 'Failed to search.'}, status=404)
        
        movies = response.json()['results']
        result = {'status': True, 'movies': []}
        for movie in movies:
            if movie['poster_path']:
                result['movies'].append({
                    'id': movie['id'],
                    'title': movie['title'],
                    'poster_path': movie['poster_path'],
                    'release_date': movie['release_date'],
                })
        return JsonResponse(result, status=200)