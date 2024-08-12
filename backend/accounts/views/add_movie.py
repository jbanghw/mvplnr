from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from accounts.models import MovieRecord
from django.conf import settings
import requests

class AddMovieAPIView(APIView):
    permission_classses = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        movie_id = request.data.get('movie_id')

        params = {'api_key': f'{settings.TMDB_API_KEY}'}
        title_request = requests.get(f"{settings.TMDB_URL}/movie/{movie_id}", params=params).json()
        title = title_request['title']

        already_added = MovieRecord.objects.filter(user=user,
                                                   movie_id=movie_id)
        if already_added:
            return Response(
                {'message': 'this movie is already added'},
                status=status.HTTP_202_ACCEPTED
            )

        movie_record = MovieRecord.objects.create(user=user,
                                                  movie_id=movie_id,
                                                  title=title)
        movie_record.save()
        return Response(
            {'message': 'successfully added a movie'},
            status=status.HTTP_202_ACCEPTED
        )
