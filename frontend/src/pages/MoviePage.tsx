import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../interfaces/Movie"
import Spinner from "../components/Spinner"

const MoviePage = () => {
  const { id } = useParams()
  const [detail, setDetail] = useState<Movie>({ id })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/movie/${id}/`, {
          method: 'GET',
          mode: 'cors'
        })
        const data = await response.json()
        if (response.status === 200 && data.status) {
          setDetail(data.movie_detail)
        }
      } catch (error) {
        console.log('Failed to fetch movie.', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [])


  return (
    <>
      {
        loading
          ? <Spinner loading={loading} />
          : <h1> MoviePage for movie {id} with title: {detail.title}</h1 >
      }
    </>
  )
}

export default MoviePage