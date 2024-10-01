import { useEffect, useState } from "react"
import Movie from "../interfaces/Movie"
import Spinner from "./Spinner"
import MovieListing from "./MovieListing"
import { NavLink } from "react-router-dom"

const link: { [title: string]: string } = {
  'Popular Movies': '/movies/popular',
  'Now Playing': '/movies/now-playing',
  'Upcoming': '/movies/upcoming'
}

const MovieListings = ({ title, showAll, url, errorMessage }: { title: string, showAll: boolean, url: string, errorMessage: string }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors'
        })
        const data = await response.json()
        if (response.ok && data.status) {
          setMovies(data.movies)
          if (!showAll) {
            setMovies(prevMovies => prevMovies.slice(0, 6))
          }
        }
      } catch (error) {
        console.log(errorMessage, error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    <section className="px-4 py-10 rounded-md">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {title}
        </h2>
        {loading
          ? <Spinner loading={loading} />
          : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
              movies.map((movie) => {
                return <MovieListing key={movie.id} movie={movie} />
              })
            }
          </div>
        }
        <NavLink to={link[title]}>
          <h2 className="text-xl font-bold mt-10 text-center">
            View More
          </h2>
        </NavLink>
      </div>
    </section>
  )
}

export default MovieListings