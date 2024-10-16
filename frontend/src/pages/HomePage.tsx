import { NavLink } from "react-router-dom"
import MovieListings from "../components/MovieListings"

const HomePage = () => {
  const api = import.meta.env.VITE_API_URL
  return (
    <>
      <MovieListings title='Popular Movies' showAll={false} url={`${api}/movies/popular/`} errorMessage="Error fetching popular movies" />
      <NavLink to='/movies/popular'>
        <h2 className="text-xl font-bold mb-10 text-center">
          View More
        </h2>
      </NavLink>
      <MovieListings title='Now Playing' showAll={false} url={`${api}/movies/in_theaters/`} errorMessage="Error fetching now playing movies" />
      <NavLink to='/movies/now-playing'>
        <h2 className="text-xl font-bold mb-10 text-center">
          View More
        </h2>
      </NavLink>
    </>
  )
}

export default HomePage