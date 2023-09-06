from rest_framework import status
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.serializers import UserCreateSerializer

class EditProfileAPIView(UpdateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [IsAuthenticated,]

    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        if 'password' in serializer.validated_data:
            instance.set_password(serializer.validated_data['password'])
            instance.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
