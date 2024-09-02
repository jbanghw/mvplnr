import { Link } from "react-router-dom"
import Movie from "../interfaces/Movie"

const MovieListing = ({ movie }: { movie: Movie }) => {
  const posterURL = import.meta.env.VITE_TMDB_POSTER_URL

  return (
    <div>
      <div>
        <div className="max-w-56">
          <img src={`${posterURL}${movie.poster_path}`} />
        </div>
        <div>
          {movie.title}
        </div>
        <div>
          {movie.release_date}
        </div>
      </div>
      <Link to={`/movies/${movie.id}`}>View More</Link>

    </div>
  )
}

export default MovieListing