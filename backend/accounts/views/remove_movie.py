from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from accounts.models import MovieRecord

class RemoveMovieAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        movie_id = request.data.get('movie_id')
        movie_record = MovieRecord.objects.filter(user=user,
                                                  movie_id=movie_id)
        movie_record.delete()
        return Response(
            {'message': 'successfully deleted a movie'},
             status=status.HTTP_202_ACCEPTED
        )

