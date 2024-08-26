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
        const res = await fetch(url, {
          method: 'GET',
          mode: 'cors'
        })
        const data = await res.json()
        if (data.status) {
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
    <section className="bg-blue50 m-4">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Popular Movies
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
      </div>
    </section>
  )
}

export default MovieListings