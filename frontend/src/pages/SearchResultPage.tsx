import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../interfaces/Movie"
import Spinner from "../components/Spinner"
import MovieListing from "../components/MovieListing"

const SearchResultPage = () => {
  const api = import.meta.env.VITE_API_URL
  let { search } = useParams()
  const [movies, setMovies] = useState<Movie[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(`${api}/movies/search/?search=${search}`, { method: 'GET' })
        const data = await response.json()
        if (response.ok && data.status) {
          setMovies(data.movies)
        }
      } catch (error) {
        console.log('Failed to search movies', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSearch()
  }, [search])

  return (
    <section className="px-4 py-10 rounded-md">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Results for '{search}'
        </h2>
        {loading
          ? <Spinner loading={loading} />
          : <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {
              movies?.map((movie) => {
                return <MovieListing key={movie.id} movie={movie} />
              })
            }
          </div>
        }
      </div>
    </section>
  )
}

export default SearchResultPage