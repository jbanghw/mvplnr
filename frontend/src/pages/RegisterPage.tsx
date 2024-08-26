import { FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const navigate = useNavigate()

  // error messages
  const [firstnameError, setFirstnameError] = useState('')
  const [lastnameError, setLastnameError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [avatarError, setAvatarError] = useState('')

  // form submit handler
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/accounts/register/', {
        method: 'POST',
        body: formData,
      })
      if (response.status === 201) {
        navigate('/login')
        return
      }
      const data = await response.json()
      // register unsuccessful
      if ('first_name' in data) {
        setFirstnameError(data['first_name'][0])
      } else {
        setFirstnameError('')
      }
      if ('last_name' in data) {
        setLastnameError(data['last_name'][0])
      } else {
        setLastnameError('')
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
      if ('email' in data) {
        setEmailError(data['email'][0])
      } else {
        setEmailError('')
      }
      if ('avatar' in data) {
        setAvatarError(data['avatar'][0])
      } else {
        setAvatarError('')
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
            Register
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                type='text'
                name="first_name"
                id="first_name"
                placeholder="first name"
                required
                autoFocus
                className="text-black"
              />
              <div>{firstnameError}</div>
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                type='text'
                name="last_name"
                id="last_name"
                placeholder="last name"
                required
                className="text-black"
              />
              <div>{lastnameError}</div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type='email'
                name="email"
                id="email"
                placeholder="email@email.com"
                required
                className="text-black"
              />
              <div>{emailError}</div>
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type='text'
                name="username"
                id="username"
                placeholder="username"
                required
                className="text-black"
              />
              <div>{usernameError}</div>
            </div>
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
              <label htmlFor="avatar">Avatar</label>
              <input
                accept="image/*"
                type="file"
                id="avatar"
                name="avatar"
              />
              <div>{avatarError}</div>
            </div>
            <button type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage