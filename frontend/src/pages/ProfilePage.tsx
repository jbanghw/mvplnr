import { FormEventHandler, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import UserMovie from "../interfaces/UserMovie"
import ReactPaginate from "react-paginate"
import ProfileMovies from "../components/ProfileMovies"

const ProfilePage = () => {
  const { loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const moviesPerPage = 10

  const [movies, setMovies] = useState<UserMovie[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [titleFilter, setTitleFilter] = useState('')
  const [entryChanged, setEntryChanged] = useState(false)
  const [watchedFilter, setWatchedFilter] = useState(0)  // -1 for unwatched, 0 for both, 1 for watched
  const [dateOrder, setDateOrder] = useState(1)  // 1 for desc, 0 for asc

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setEntryChanged(prev => !prev)
  }

  useEffect(() => {
    if (loggedIn === null) {
      navigate('/login')
    }

    const fetchMovies = async () => {
      const url = `/api/accounts/movies/?title_filter=${titleFilter}&watched=${watchedFilter}&limit=${moviesPerPage}&offset=${moviesPerPage * currentPage}&date_order=${dateOrder}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loggedIn}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          setPageCount(Math.ceil(data.count / moviesPerPage))
          setMovies(data.results)
        }
      } catch (error) {
        console.log('Failed to fetch my movies.', error)
      }
    }
    fetchMovies()
  }, [currentPage, entryChanged, watchedFilter, dateOrder])

  return (
    <div>
      <div>
        <button onClick={() => {
          setWatchedFilter(-1)
        }}>
          Not Watched
        </button>
        <button onClick={() => {
          setWatchedFilter(0)
        }}>
          All
        </button>
        <button onClick={() => {
          setWatchedFilter(1)
        }}>
          Watched
        </button>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='search'
            className="bg-black"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setEntryChanged(prev => !prev)
              }
            }} />
          <button type='submit'>Filter</button>
        </form>
      </div>
      <ProfileMovies movies={movies} dateOrder={dateOrder} setDateOrder={setDateOrder} setCurrentPage={setCurrentPage} setEntryChanged={setEntryChanged} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => {
          setCurrentPage(e.selected)
        }}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default ProfilePage