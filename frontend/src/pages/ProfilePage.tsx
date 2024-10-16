import { FormEventHandler, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import UserMovie from "../interfaces/UserMovie"
import ReactPaginate from "react-paginate"
import ProfileMovies from "../components/ProfileMovies"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { IconContext } from "react-icons"

const ProfilePage = () => {
  const api = import.meta.env.VITE_API_URL
  const { loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const moviesPerPage = 10
  const active = 'text-white bg-black hover:bg-gray-600 hover:text-white rounded-md px-3 py-2'
  const inactive = 'text-white hover:bg-gray-500 hover:text-white rounded-md px-3 py-2'

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
      const url = `${api}/accounts/movies/?title_filter=${titleFilter}&watched=${watchedFilter}&limit=${moviesPerPage}&offset=${moviesPerPage * currentPage}&date_order=${dateOrder}`
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
    <div className="grid grid-cols-1 sm:w-full md:w-11/12 space-y-5 text-center">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row space-x-5">
          <button className={watchedFilter === -1 ? active : inactive} onClick={() => {
            setWatchedFilter(-1)
          }}>
            Not Watched
          </button>
          <button className={watchedFilter === 0 ? active : inactive} onClick={() => {
            setWatchedFilter(0)
          }}>
            All
          </button>
          <button className={watchedFilter === 1 ? active : inactive} onClick={() => {
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
              className="bg-black mr-3 rounded-md"
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
      </div>
      <div className="w-full">
        <ProfileMovies movies={movies} dateOrder={dateOrder} setDateOrder={setDateOrder} setCurrentPage={setCurrentPage} setEntryChanged={setEntryChanged} />
      </div>
      {/* <div className="flex flex-row justify-center">
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
      </div> */}
      <div className="flex flex-row justify-center">
        <ReactPaginate
          breakLabel="..."
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          onPageChange={(e) => {
            setCurrentPage(e.selected)
          }}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          previousLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      </div>
    </div>
  )
}

export default ProfilePage