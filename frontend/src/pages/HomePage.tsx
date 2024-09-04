import MovieListings from "../components/MovieListings"

const HomePage = () => {

  return (
    <>
      <MovieListings showAll={false} url='/api/movies/popular/' errorMessage="Error fetching popular movies" />
    </>
  )
}

export default HomePage