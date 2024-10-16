const AddMovieService = async (movie_id: string, token: string) => {
  const api = import.meta.env.VITE_API_URL
  try {
    const response = await fetch(`${api}/accounts/add_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ movie_id: movie_id })
    })
    return response
  } catch (error) {
    console.log('Failed to add movie.', error)
  }
}

export default AddMovieService