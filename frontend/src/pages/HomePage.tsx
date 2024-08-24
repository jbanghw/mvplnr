import MovieListings from "../components/MoveListings"

const HomePage = () => {

  return (
    <>
      <MovieListings showAll={false} url='/api/movies/popular/' errorMessage="Error fetching popular movies" />
    </>
  )
}

export default HomePage