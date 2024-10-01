import { Link } from "react-router-dom"
import Movie from "../interfaces/Movie"

const MovieListing = ({ movie }: { movie: Movie }) => {
  const posterURL = import.meta.env.VITE_TMDB_POSTER_URL

  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="bg-gray-700 rounded-xl shadow-md relative">
        <div className="p-4">
          <div className="max-w-56">
            <img className="rounded-xl" src={`${posterURL}${movie.poster_path}`} />
          </div>
          <div className="text-xl font-bold my-2">
            {movie.title}
          </div>
          <div>
            Release Date: {movie.release_date}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieListing