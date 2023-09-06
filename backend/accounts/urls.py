from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.views.register import RegisterAPIView
from accounts.views.profile import ProfileAPIView
from accounts.views.edit_profile import EditProfileAPIView
from accounts.views.movie_record import MovieRecordAPIView
from accounts.views.is_added import IsAdded
from accounts.views.add_movie import AddMovieAPIView
from accounts.views.remove_movie import RemoveMovieAPIView
from accounts.views.watch_movie import WatchMovieAPIView
from accounts.views.unwatch_movie import UnwatchMovieAPIView


app_name = 'accounts'

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('profile/', ProfileAPIView.as_view(), name='profile'),
    path('profile/edit/', EditProfileAPIView.as_view(), name='edit_profile'),
    path('movies/', MovieRecordAPIView.as_view(), name='movie_record'),
    path('is_added/', IsAdded.as_view(), name='is_added'),
    path('add_movie/', AddMovieAPIView.as_view(), name='add_movie'),
    path('remove_movie/', RemoveMovieAPIView.as_view(), name='remove_movie'),
    path('watch_movie/', WatchMovieAPIView.as_view(), name='watch_movie'),
    path('unwatch_movie/', UnwatchMovieAPIView.as_view(), name='unwatch_movie'),
]