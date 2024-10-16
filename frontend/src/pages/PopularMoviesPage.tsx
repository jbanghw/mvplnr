import MovieListings from "../components/MovieListings"

const PopularMoviesPage = () => {
  const api = import.meta.env.VITE_API_URL
  return (
    <>
      <MovieListings title='Popular Movies' showAll={true} url={`${api}/movies/popular/`} errorMessage="Error fetching popular movies" />
    </>
  )
}

export default PopularMoviesPage