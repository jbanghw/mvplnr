from rest_framework.generics import RetrieveAPIView, get_object_or_404
from accounts.models import User
from accounts.serializers import UserSerializer

class ProfileAPIView(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(User, id=self.request.user.id)
