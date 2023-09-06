from django.urls import path

from movies.views.view_movie import MovieView
from movies.views.popular import PopularMoviesView
from movies.views.upcoming import UpcomingMoviesView
from movies.views.in_theaters import InTheatersView
from movies.views.search import MovieSearchView

app_name = 'movies'

urlpatterns = [
    path('movie/', MovieView.as_view(), name='movie'),
    path('search/', MovieSearchView.as_view(), name='movie_search'),
    path('popular/', PopularMoviesView.as_view(), name='popular_movies'),
    path('upcoming/', UpcomingMoviesView.as_view(), name='upcoming_movies'),
    path('in_theaters/', InTheatersView.as_view(), name='current_movies'),
]