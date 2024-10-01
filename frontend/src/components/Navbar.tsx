import { useContext } from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import SearchBar from "./SearchBar"
import { MdMovie } from "react-icons/md"

const LoggedInNavbar = () => {
  const { setLoggedIn } = useContext(AuthContext)

  return (
    <div className="flex items-center justify-self-end">
      <NavLink to='/login' onClick={() => {
        localStorage.removeItem('access')
        setLoggedIn(null)
      }}>
        Logout
      </NavLink>
    </div>
  )
}

const LoggedOutNavbar = () => {
  return (
    <div className="flex items-center space-x-3 ml-auto">
      <NavLink to='/login'>
        Login
      </NavLink>
      <NavLink to='/register'>
        Register
      </NavLink>
    </div>
  )
}

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext)

  const linkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive
      ? 'text-white bg-black hover:bg-gray-600 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-500 hover:text-white rounded-md px-3 py-2'
  }

  return (
    <nav className='bg-gray-900 border-b border-gray-800 w-full'>
      <div className='mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <MdMovie className='h-10 w-auto' />
            </NavLink>
            <div className='flex space-x-5'>
              <NavLink className={linkClass} to='/'>
                Home
              </NavLink>
              <NavLink className={linkClass} to='/profile'>
                Profile
              </NavLink>
              <NavLink className={linkClass} to='/movies/popular'>
                Popular Movies
              </NavLink>
              <NavLink className={linkClass} to='/movies/now-playing'>
                Now Playing
              </NavLink>
              <SearchBar />
            </div>
            <div className="flex ml-auto">
              {
                loggedIn
                  ? <LoggedInNavbar />
                  : <LoggedOutNavbar />
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar