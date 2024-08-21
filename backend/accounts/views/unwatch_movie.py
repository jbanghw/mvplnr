from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from accounts.models import MovieRecord
from django.conf import settings
from dotenv import load_dotenv
import requests
import os

class UnwatchMovieAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        movie_id = request.data.get('movie_id')

        load_dotenv()
        params = {'api_key': os.getenv("TMDB_API_KEY")}
        title_request = requests.get(f"{settings.TMDB_URL}/movie/{movie_id}", params=params).json()
        title = title_request['title']

        already_added = MovieRecord.objects.filter(user=user,
                                                   movie_id=movie_id)
        
        if not already_added:
            movie_record = MovieRecord.objects.create(user=user,
                                                      movie_id=movie_id,
                                                      title=title,
                                                      watched=False)
            return Response(
                {'message': 'successfully unwatched a movie'},
                status=status.HTTP_202_ACCEPTED
            )
                    
        else:
            movie_record = already_added[0]
            movie_record.watched = False
            movie_record.save()
            
            return Response(
                {'message': 'successfully unwatched a movie'},
                status=status.HTTP_202_ACCEPTED
            )
