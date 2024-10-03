import MovieListings from "../components/MovieListings"

const PopularMoviesPage = () => {
  return (
    <>
      <MovieListings title='Popular Movies' showAll={true} url='/api/movies/popular/' errorMessage="Error fetching popular movies" />
    </>
  )
}

export default PopularMoviesPage