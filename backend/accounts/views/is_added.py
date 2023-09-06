from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.models import MovieRecord
from accounts.serializers import MovieRecordSerializer


class IsAdded(RetrieveAPIView):
    serializer_class = MovieRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            record = MovieRecord.objects.get(user=self.request.user,
                                             movie_id=self.request.query_params.get('id'))
            if record:
                return record
        except MovieRecord.DoesNotExist:
            return None
