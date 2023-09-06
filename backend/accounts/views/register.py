from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from accounts.serializers import UserCreateSerializer

class RegisterAPIView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserCreateSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()