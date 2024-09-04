import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import UserMovie from "../interfaces/UserMovie"

const ProfilePage = () => {
  const { loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const moviesPerPage = 10

  const [movies, setMovies] = useState<UserMovie[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [titleFilter, setTitleFilter] = useState('')
  const [watchedFilter, setWatchedFilter] = useState(0)  // -1 for unwatched, 0 for both, 1 for watched
  const [dateOrder, setDateOrder] = useState(1)  // 1 for desc, 0 for asc

  useEffect(() => {
    if (loggedIn === null) {
      navigate('/login')
    }

    const fetchMovies = async () => {
      const url = `/api/accounts/movies/?title_filter=${titleFilter}&watched=${watchedFilter}&limit=${moviesPerPage}&offset=${moviesPerPage * (currentPage - 1)}&date_order=${dateOrder}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loggedIn}`
          }
        })
        const data = await response.json()
        setPageCount(Math.ceil(data.count / moviesPerPage))
        setMovies(data)
      } catch (error) {
        console.log('Failed to fetch my movies.', error)
      }
    }
    fetchMovies()
  }, [currentPage, titleFilter, watchedFilter, dateOrder])

  return (
    <div>
      {
        movies?.map((movie) => {
          return <div key={movie.movie_id}>
            {movie.title}
            {movie.movie_id}
            {movie.added_date}
            {movie.watched}
          </div>
        })
      }
    </div>
  )
}

export default ProfilePage