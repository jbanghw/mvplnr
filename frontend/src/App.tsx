import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { useState } from "react"
import MainLayout from "./layouts/MainLayout"
import AuthContext from "./contexts/AuthContext"

// pages
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('access'))
  const value = { loggedIn, setLoggedIn }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} >
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Route>
    )
  )

  return (
    <div>
      <AuthContext.Provider value={value}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  )
}

export default App
