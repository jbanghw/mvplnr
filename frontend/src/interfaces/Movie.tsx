export default interface Movie {
  id: number | string | undefined
  title?: string
  poster_path?: string
  release_date?: string
  runtime?: number
  imdb_id?: string
  overview?: string
  genres?: string[]
  user_data?: {
    added: boolean,
    watched: boolean
  }
}