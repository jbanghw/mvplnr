from django.http import JsonResponse
from django.views import View
from django.conf import settings
from dotenv import load_dotenv
import requests
import os

# class MovieView():
class PopularMoviesView(View):
    def get(self, request):
        load_dotenv()
        params = {'api_key': os.getenv("TMDB_API_KEY")}
        response = requests.get(f'{settings.TMDB_URL}/movie/popular', params=params)

        if response.status_code != 200:
            return JsonResponse({'status': False, 'message': 'Failed to fetch popular movies.'}, status=404)

        movies = response.json()['results']
        result = {'status': True, 'movies': []}
        for movie in movies:
            result['movies'].append({
                'id': movie['id'],
                'title': movie['title'],
                'poster_path': movie['poster_path'],
                'release_date': movie['release_date']
            })
        return JsonResponse(result, status=200)
