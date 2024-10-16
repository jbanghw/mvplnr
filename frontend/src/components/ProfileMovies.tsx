import { toast } from "react-toastify"
import UserMovie from "../interfaces/UserMovie"
import RemoveMovieService from "../services/RemoveMovieService"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import { FaArrowCircleDown, FaArrowCircleUp, FaEye, FaEyeSlash } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { IconContext } from "react-icons"

interface PropsType {
  movies: UserMovie[]
  dateOrder: number
  setDateOrder: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setEntryChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileMovies = ({ movies, dateOrder, setDateOrder, setCurrentPage, setEntryChanged }: PropsType) => {
  const api = import.meta.env.VITE_API_URL
  const { loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const [orderHover, setOrderHover] = useState(false)
  const [watchHover, setWatchHover] = useState('')

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
      url = `${api}/accounts/unwatch_movie/`
    } else {
      url = `${api}/accounts/watch_movie/`
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
    <div className="grid md:grid-cols-6 sm:grid-cols-5 w-full">
      <div className="md:col-span-3 sm:col-span-2 text-center">
        Title
      </div>
      <div className="col-span-1 flex flex-row space-x-2 justify-center">
        <div>
          Date Added
        </div>
        <button
          onClick={handleOrderChange}
          onMouseEnter={() => {
            setOrderHover(true)
          }}
          onMouseLeave={() => {
            setOrderHover(false)
          }}
        >
          {dateOrder === 1
            ?
            orderHover ? <FaArrowCircleUp /> : <FaArrowCircleDown />
            :
            orderHover ? <FaArrowCircleDown /> : <FaArrowCircleUp />
          }
        </button>
      </div>
      <div className="col-span-1">
        Watched
      </div>
      <div className="col-span-1 ">
        Remove
      </div>
      {
        movies.map((movie) => {
          return <div key={movie.movie_id} className="md:col-span-6 sm:col-span-5 grid md:grid-cols-6 sm:grid-cols-5 text-center">
            <button className="md:col-span-3 sm:col-span-2 text-left" onClick={(_) => {
              navigate(`/movies/${movie.movie_id}`)
            }}>
              <span className="font-semibold line-clamp-1">
                {movie.title}
              </span>
            </button>
            <div className="col-span-1 flex justify-center">
              {movie.added_date.slice(0, 10)}
            </div>
            <button
              className="col-span-1 flex justify-center"
              onClick={() => handleWatch(movie.movie_id, movie.watched)}
              onMouseEnter={() => {
                setWatchHover(movie.movie_id)
              }}
              onMouseLeave={() => {
                setWatchHover('')
              }}
            >
              {movie.watched
                ?
                watchHover === movie.movie_id ?
                  <IconContext.Provider value={{ size: '32px' }}>
                    <FaEyeSlash />
                  </IconContext.Provider> :
                  <IconContext.Provider value={{ size: '32px' }}>
                    <FaEye />
                  </IconContext.Provider>
                :
                watchHover === movie.movie_id ?
                  <IconContext.Provider value={{ size: '32px' }}>
                    <FaEye />
                  </IconContext.Provider> :
                  <IconContext.Provider value={{ size: '32px' }}>
                    <FaEyeSlash />
                  </IconContext.Provider>
              }
            </button>
            <button className="col-span-1 flex justify-center" onClick={() => handleRemove(movie.movie_id)}>
              <IconContext.Provider value={{ color: 'red', size: "32px" }}>
                <MdDeleteOutline />
              </IconContext.Provider>
            </button>
          </div>
        })
      }
      {
        Array.from({ length: 10 - movies.length }, (_, idx) =>
          <div key={idx} className="md:col-span-6 sm:col-span-5 h-9">
            &nbsp;
          </div>
        )
      }
    </div>
  )
}

export default ProfileMovies