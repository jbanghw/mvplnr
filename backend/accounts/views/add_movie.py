from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import MovieRecordSerializer
from accounts.models import MovieRecord
import requests, json

class AddMovieAPIView(APIView):
    permission_classses = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        movie_id = request.data.get('movie_id')

        title_request = requests.get('https://tv-api.com/en/API/Title/k_e1gnyu67/{movie_id}'.format(movie_id = movie_id)).json()
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
