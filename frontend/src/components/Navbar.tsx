import { useContext } from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"

const LoggedInNavbar = () => {
  const { setLoggedIn } = useContext(AuthContext)

  return (
    <>
      <NavLink to='/login' onClick={() => {
        localStorage.removeItem('access')
        setLoggedIn(null)
      }}>
        Logout
      </NavLink>
    </>
  )
}

const LoggedOutNavbar = () => {
  return (
    <>
      <NavLink to='/login'>
        Login
      </NavLink>
      <NavLink to='/register'>
        Register
      </NavLink>
    </>
  )
}

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext)

  return (
    <nav>
      <div>
        <div>
          <div>
            <NavLink to={'/'}>
              Image Placeholder
            </NavLink>
            <div>
              <div>
                <NavLink to='/'>
                  Home
                </NavLink>
                <NavLink to='/profile'>
                  Profile
                </NavLink>
                <NavLink to='/movies/popular'>
                  Popular Movies
                </NavLink>
              </div>
            </div>
            <div>
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