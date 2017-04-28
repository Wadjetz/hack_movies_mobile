export const API_URL = "http://localhost:3000"

export function getInitData(): Promise<any> {
  const query = `
  {
    movies(offset: 0, take: 10) {
      _id
      title
      poster
      releaseDate
    }
  }
  `.replace(/\s\s*/g, " ")
  return fetch(`${API_URL}/graphql?query=${query}`)
          .then(r => r.json())
}
