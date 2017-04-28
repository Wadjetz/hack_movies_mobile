import * as storage from "./storage"

export const API_URL = "http://localhost:3000"
export function getInitData(): Promise<any> {
  const query = `
  {
    movies {
      _id
      title
      poster
      releaseDate
    }
    theaters {
      _id
      name
      address
      network
    }
    showtime {
      movieId
      theaterId
      date
      version
      times
    }
  }
  `.replace(/\s\s*/g, " ")
  return fetch(`${API_URL}/graphql?query=${query}`).then(r => r.json())
}
