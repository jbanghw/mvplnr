from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from accounts.models import MovieRecord
from accounts.serializers import MovieRecordSerializer

class CustomPagination(LimitOffsetPagination):
    default_limit = 3

class MovieRecordAPIView(ListAPIView):
    serializer_class = MovieRecordSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        try:
            title_filter = self.request.query_params.get('title_filter')
            watched_filter = self.request.query_params.get('watched')
            date_order = self.request.query_params.get('date_order')

            movie_records = MovieRecord.objects.filter(user=self.request.user)
            movie_records = movie_records.filter(title__contains=title_filter)
            if watched_filter == '-1':
                movie_records = movie_records.filter(watched=False)
            elif watched_filter == '1':
                movie_records = movie_records.filter(watched=True)
            if date_order == '1':
                movie_records = movie_records.order_by('-added_date')
            elif date_order == '0':
                movie_records = movie_records.order_by('added_date')
            
            return movie_records

        except:
            return []