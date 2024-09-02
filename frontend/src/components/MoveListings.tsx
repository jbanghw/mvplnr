import { useEffect, useState } from "react"
import Movie from "../interfaces/Movie"
import Spinner from "./Spinner"
import MovieListing from "./MovieListing"

const MovieListings = ({ showAll, url, errorMessage }: { showAll: boolean, url: string, errorMessage: string }) => {
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
        if (response.status === 200 && data.status) {
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
    <section>
      <div>
        <h2>
          Popular Movies
        </h2>
        {loading
          ? <Spinner loading={loading} />
          : <div>
            {
              movies.map((movie) => {
                return <MovieListing key={movie.id} movie={movie} />
              })
            }
          </div>
        }
      </div>
    </section>
  )
}

export default MovieListings