import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../interfaces/Movie"
import Spinner from "../components/Spinner"
import AuthContext from "../contexts/AuthContext"
import NotFoundPage from "./NotFoundPage"
import AddMovieService from "../services/AddMovieService"
import RemoveMovieService from "../services/RemoveMovieService"
import { toast } from "react-toastify"

const MoviePage = () => {
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
        const response = await fetch(`/api/movies/movie/${id}/`, {
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
        const response = await fetch(`/api/accounts/is_added/?id=${id}`, {
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

  if (!('title' in movie)) {
    return <NotFoundPage />
  }

  return (
    <>
      {
        loading
          ? <Spinner loading={loading} />
          : <div>
            <div className="max-w-56">
              <img src={`${posterURL}${movie.poster_path}`} alt='movie poster' />
            </div>
            <div>
              {movie['title']}
            </div>
            <div>
              {movie['release_date']}
            </div>
            <div>
              {movie['runtime']}
            </div>
            <div>
              {
                movie['genres']?.map((genre) => {
                  return <span>{genre}</span>
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
              loggedIn !== null && isAdded
                ? <div>
                  <button onClick={handleRemoveMovie}>
                    Remove from list
                  </button>
                </div>
                : <div>
                  <button onClick={handleAddMovie}>
                    Add to list
                  </button>
                </div>
            }
          </div >
      }
    </>
  )
}

export default MoviePage