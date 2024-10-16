import MovieListings from "../components/MovieListings"

const NowPlayingPage = () => {
  const api = import.meta.env.VITE_API_URL
  return (
    <>
      <MovieListings title='Now Playing' showAll={true} url={`${api}/movies/in_theaters/`} errorMessage="Error fetching now playing movies" />
    </>
  )
}

export default NowPlayingPage