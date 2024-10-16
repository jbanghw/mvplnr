import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../interfaces/Movie"
import Spinner from "../components/Spinner"
import AuthContext from "../contexts/AuthContext"
import AddMovieService from "../services/AddMovieService"
import RemoveMovieService from "../services/RemoveMovieService"
import { toast } from "react-toastify"

const MoviePage = () => {
  const api = import.meta.env.VITE_API_URL
  const { id } = useParams()
  const { loggedIn } = useContext(AuthContext)
  const [movie, setMovie] = useState<Movie>({ id })
  const [loading, setLoading] = useState(true)
  const [isAdded, setIsAdded] = useState<boolean>(false)
  const posterURL = import.meta.env.VITE_TMDB_POSTER_URL

  const handleAddMovie = async () => {
    const response = await AddMovieService(id as string, loggedIn as string)
    if (response?.ok) {
      setIsAdded(true)
      toast.success('Movie added successfully!')
    }
  }

  const handleRemoveMovie = async () => {
    const response = await RemoveMovieService(id as string, loggedIn as string)
    if (response?.ok) {
      setIsAdded(false)
      toast.success('Movie removed successfully!')
    }
  }

  useEffect(() => {
    // fetch movie data
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${api}/movies/movie/${id}/`, {
          method: 'GET',
          mode: 'cors'
        })
        const data = await response.json()
        if (response.ok && data.status) {
          setMovie(data.movie_detail)
        } else {
          throw new Error()
        }
      } catch (error) {
        console.log('Failed to fetch movie.', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()

    // fetch if movie is added to the user's list
    const fetchIsAdded = async () => {
      try {
        const response = await fetch(`${api}/accounts/is_added/?id=${id}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${loggedIn}` },
        })
        const data = await response.json()
        if (data['movie_id'] !== '') {
          setIsAdded(true)
        }
      } catch (error) {
        console.log('Failed to fetch if the movie is added to the user\'s list.', error)
      }
    }
    if (loggedIn !== null) {
      fetchIsAdded()
    }
  }, [])

  return (
    <>
      {
        loading
          ? <Spinner loading={loading} />
          :
          <section className="max-w-7xl grid grid-cols-2 space-x-2 justify-items-center mx-5">
            <div className="max-w-80">
              <img className="rounded-xl" src={`${posterURL}${movie.poster_path}`} alt='movie poster' />
            </div>
            <div className="grid grid-cols-1 justify-start justify-items-start">
              <div className="text-3xl">
                {movie['title']}
              </div>
              <div className="text-xl">
                Release Date: {movie['release_date']}
              </div>
              <div>
                Runtime: {movie['runtime']} minutes
              </div>
              <div className="flex">
                Genres:&nbsp;
                {
                  movie['genres']?.map((genre, i) => {
                    return <span key={genre}>
                      {i > 0 && ', '}
                      {genre}
                    </span>
                  })
                }
              </div>
              <div>
                {movie['overview']}
              </div>
              <div>
                <a href={`https://www.imdb.com/title/${movie['imdb_id']}/`} target="_blank">
                  IMDB Link
                </a>
              </div>
              {
                loggedIn !== null
                  ? isAdded
                    ? <div className="self-end justify-self-end">
                      <button onClick={handleRemoveMovie}>
                        Remove from list
                      </button>
                    </div>
                    : <div className="self-end justify-self-end">
                      <button onClick={handleAddMovie}>
                        Add to list
                      </button>
                    </div>
                  : null
              }
            </div>
          </section >
      }
    </>
  )
}

export default MoviePage