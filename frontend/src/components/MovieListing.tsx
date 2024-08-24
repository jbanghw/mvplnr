import { Dispatch, SetStateAction, useState } from "react"
import Movie from "../interfaces/Movie"
// import { Link } from "react-router-dom"

const ShowMoreButton = ({ showFullDesc, setShowFullDesc }: { showFullDesc: boolean, setShowFullDesc: Dispatch<SetStateAction<boolean>> }) => {
  const handleClick = () => {
    setShowFullDesc(prevState => !prevState)
  }
  return (
    <button className="text-indigo-500 mb-5 hover:text-indigo-600" onClick={handleClick}>
      {showFullDesc ? 'Less' : 'More'}
    </button>
  )
}

const MovieListing = ({ movie }: { movie: Movie }) => {
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false)
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{movie.title}</div>
          <h3 className="text-xl font-bold">{movie.title}</h3>
        </div>

        <div className="mb-5">{movie.title}</div>
        <ShowMoreButton showFullDesc={showFullDesc} setShowFullDesc={setShowFullDesc} />

        <h3 className="text-indigo-500 mb-2">{movie.title} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            {/* <FaMapMarker className="inline text-lg mb-1 mr-1" /> */}
            {movie.title}
          </div>
          {/* <Link
            to={`/movies/${movie.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default MovieListing