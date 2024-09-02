from django.http import JsonResponse
from django.views import View
from django.conf import settings
from dotenv import load_dotenv
import requests
import os

# class MovieView():
class MovieView(View):
    def get(self, request, id):
        load_dotenv()
        params = {'api_key': os.getenv("TMDB_API_KEY")}
        response = requests.get(f'{settings.TMDB_URL}/movie/{id}', params=params)

        if response.status_code != 200:
            return JsonResponse({'status': False, 'message': 'Failed to fetch movie.'}, status=404)

        movie = response.json()
        result = {'status': True, 'movie_detail': {'genres': []}}
        for genre in movie['genres']:
            result['movie_detail']['genres'].append(genre['name'])
        result['movie_detail']['id'] = movie['id']
        result['movie_detail']['title'] = movie['title']
        result['movie_detail']['imdb_id'] = movie['imdb_id']
        result['movie_detail']['overview'] = movie['overview']
        result['movie_detail']['poster_path'] = movie['poster_path']
        result['movie_detail']['release_date'] = movie['release_date']
        result['movie_detail']['runtime'] = movie['runtime']
        return JsonResponse(result, status=200)
