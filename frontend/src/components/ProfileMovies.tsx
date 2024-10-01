import { toast } from "react-toastify"
import UserMovie from "../interfaces/UserMovie"
import RemoveMovieService from "../services/RemoveMovieService"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

interface PropsType {
  movies: UserMovie[]
  dateOrder: number
  setDateOrder: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setEntryChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileMovies = ({ movies, dateOrder, setDateOrder, setCurrentPage, setEntryChanged }: PropsType) => {
  const { loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleOrderChange = () => {
    setDateOrder(prev => 1 - prev)
  }

  const handleRemove = async (movie_id: string) => {
    const response = await RemoveMovieService(movie_id as string, loggedIn as string)
    if (response?.ok) {
      if (movies.length === 1) {
        setCurrentPage(prev => prev - 1)
      } else {
        setEntryChanged(prev => !prev)
      }
      toast.success('Movie removed successfully!')
    }
  }

  const handleWatch = async (movie_id: string, watched: boolean) => {
    let url: string
    if (watched) {
      url = `/api/accounts/unwatch_movie/`
    } else {
      url = `/api/accounts/watch_movie/`
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${loggedIn}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'movie_id': movie_id })
      })
      if (response.ok) {
        if (watched) {
          toast.success('Movie successfully unwatched!')
        } else {
          toast.success('Movie successfully watched!')
        }
        setEntryChanged(prev => !prev)
      }
    } catch (error) {
      console.log('Failed to watch/unwatch movie.', error)
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            Title
          </th>
          <th>
            Date Added <button onClick={handleOrderChange}>{dateOrder === 1 ? 'desc' : 'asc'}</button>
          </th>
          <th>
            Watch / Unwatch
          </th>
          <th>
            Remove
          </th>
        </tr>
      </thead>
      <tbody>
        {
          movies.map((movie) => {
            return <tr key={movie.movie_id}>
              <td>
                <button onClick={(e) => {
                  navigate(`/movies/${movie.movie_id}`)
                }}>
                  {movie.title}
                </button>
              </td>
              <td>
                {movie.added_date.slice(0, 10)}
              </td>
              <td>
                <button onClick={() => handleWatch(movie.movie_id, movie.watched)}>
                  {movie.watched ? 'UNWATCH' : 'WATCH'}
                </button>
              </td>
              <td>
                <button onClick={() => handleRemove(movie.movie_id)}>
                  Remove
                </button>
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

export default ProfileMovies