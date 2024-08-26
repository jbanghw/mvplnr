import { Link } from "react-router-dom"
import Movie from "../interfaces/Movie"

const MovieListing = ({ movie }: { movie: Movie }) => {
  const posterURL = import.meta.env.VITE_TMDB_POSTER_URL

  return (
    <div className="bg-gray-700 rounded-xl shadow-xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div>
          <img src={`${posterURL}${movie.poster_path}`} />
        </div>
        <div>
          {movie.title}
        </div>
        <div>
          {movie.release_date}
        </div>
      </div>
      <Link to={`/movie/${movie.id}`}>KEKW</Link>

    </div>
  )
}

export default MovieListing