from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.models import MovieRecord
from accounts.serializers import MovieRecordSerializer


class MovieRecordAPIView(ListAPIView):
    serializer_class = MovieRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        title_filter = self.request.query_params.get('title_filter')
        watched_filter = self.request.query_params.get('watched')
        date_order = self.request.query_params.get('date_order')

        result = MovieRecord.objects.filter(user=self.request.user)

        result = result.filter(title__contains=title_filter)
        if watched_filter == '1':
            result = result.filter(watched=True)
        elif watched_filter == '0':
            result = result.filter(watched=False)
        print(result)
        if date_order == '1':
            return result.order_by('-added_date')
        return result.order_by('added_date')
