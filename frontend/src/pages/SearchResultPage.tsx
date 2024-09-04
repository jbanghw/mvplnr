import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../interfaces/Movie"
import MovieListing from "../components/MovieListing"

const SearchResultPage = () => {
  let { search } = useParams()
  const [movies, setMovies] = useState<Movie[]>()

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(`/api/movies/search/?search=${search}`, { method: 'GET' })
        const data = await response.json()
        if (response.ok && data.status) {
          setMovies(data.movies)
        }
      } catch (error) {

      }
    }
    fetchSearch()
  }, [search])

  return (
    <div>
      {
        movies?.map((movie) => {
          return <div key={movie.id}>
            <MovieListing movie={movie} />
          </div>
        })
      }
    </div>
  )
}

export default SearchResultPage