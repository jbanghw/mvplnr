import MovieListings from "../components/MovieListings"

const NowPlayingPage = () => {
  return (
    <>
      <MovieListings title='Now Playing' showAll={true} url='/api/movies/in_theaters/' errorMessage="Error fetching now playing movies" />
    </>
  )
}

export default NowPlayingPage