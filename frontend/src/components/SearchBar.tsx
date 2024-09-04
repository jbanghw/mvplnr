import { FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const navigate = useNavigate()

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (searchInput !== '') {
      navigate(`/search/${searchInput}`)
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type='text'
        placeholder='search'
        className="bg-black"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && searchInput !== '') {
            navigate(`/search/${searchInput}`)
          }
        }} />
      <button type='submit'>Search</button>
    </form>
  )
}

export default SearchBar