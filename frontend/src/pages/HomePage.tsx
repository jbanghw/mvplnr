import MovieListings from "../components/MovieListings"

const HomePage = () => {

  return (
    <>
      <MovieListings title='Popular Movies' showAll={false} url='/api/movies/popular/' errorMessage="Error fetching popular movies" />
      <MovieListings title='Now Playing' showAll={false} url='/api/movies/in_theaters/' errorMessage="Error fetching now playing movies" />
    </>
  )
}

export default HomePage