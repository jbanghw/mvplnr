from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.models import MovieRecord
from accounts.serializers import MovieRecordSerializer


class MovieRecordAPIView(ListAPIView):
    serializer_class = MovieRecordSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        try:
            title_filter = self.request.query_params.get('title_filter')
            watched_filter = self.request.query_params.get('watched')
            date_order = self.request.query_params.get('date_order')
            limit = int(self.request.query_params.get('limit'))
            offset = int(self.request.query_params.get('offset'))


            result = MovieRecord.objects.filter(user=self.request.user)

            result = result.filter(title__contains=title_filter)
            if watched_filter == '-1':
                result = result.filter(watched=False)
            elif watched_filter == '1':
                result = result.filter(watched=True)
            if date_order == '1':
                result = result.order_by('-added_date')
            elif date_order == '0':
                result = result.order_by('added_date')
            
            return result[offset:offset + limit]

        except:
            return []