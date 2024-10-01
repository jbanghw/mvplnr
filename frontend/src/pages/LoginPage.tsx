import { FormEventHandler, useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
      localStorage.removeItem('access')
      setLoggedIn(null)
    }
  }, [])

  // error messages
  const [authorizationError, setAuthorizationError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // form submit handler
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/accounts/api/token/', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('access', data['access'])
        setLoggedIn(data['access'])
        navigate('/profile')
        return
      }
      if ('detail' in data) {
        setAuthorizationError(data['detail'])
      } else {
        setAuthorizationError('')
      }
      if ('username' in data) {
        setUsernameError(data['username'][0])
      } else {
        setUsernameError('')
      }
      if ('password' in data) {
        setPasswordError(data['password'][0])
      } else {
        setPasswordError('')
      }
    } catch (error) {
      console.log('Failed to log in.', error)
    }
  }

  return (
    <section>
      <div>
        <div>
          <h1>
            Log in to your account
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type='text'
                name="username"
                id="username"
                placeholder="username"
                required
                autoFocus
                className="text-black"
              />
            </div>
            <div>{usernameError}</div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type='password'
                name="password"
                id="password"
                placeholder="••••••••"
                required
                className="text-black"
              />
              <div>{passwordError}</div>
            </div>
            <div>
              {authorizationError && <div>{authorizationError}</div>}
            </div>
            <button type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
    // <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //   <div className="w-full border rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-700 border-gray-600">
    //     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //       <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
    //         Log in to your account
    //       </h1>
    //       <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
    //         <div>
    //           <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
    //           <input
    //             type='text'
    //             name="username"
    //             id="username"
    //             placeholder="username"
    //             value={username}
    //             required
    //             onChange={(e) => setUsername(e.target.value)}
    //             className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
    //           <input
    //             type='password'
    //             name="password"
    //             id="password"
    //             placeholder="••••••••"
    //             value={password}
    //             required
    //             onChange={(e) => setPassword(e.target.value)}
    //             className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
    //           />
    //         </div>
    //         <div className="flex items-center justify-end">
    //           <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
    //         </div>
    //         <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
    //           Sign in
    //         </button>
    //         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //           Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
    //         </p>
    //       </form>
    //     </div>
    //   </div>
    // </section>
  )
}

export default LoginPage