class Movie {
  async fetcher(url: string, options: RequestInit | undefined = {}) {
    const THEMOVIEDB_ACCESS_TOKEN = process.env.THEMOVIEDB_ACCESS_TOKEN

    if (!THEMOVIEDB_ACCESS_TOKEN) {
      throw new Error('The Movie Database access token is not configured')
    }

    const init: RequestInit = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${THEMOVIEDB_ACCESS_TOKEN}`
      },
      ...options
    }

    try {
      const response = await fetch(url, init)
      const data = await response.json()

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }

      throw new Error(String(error))
    }
  }

  async list(type: string, page: string) {
    try {
      const data = await this.fetcher(`/movie/${type}?language=en-US&page=${page}`)

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }

      throw new Error(String(error))
    }
  }

  async search(query: string, page: string) {
    try {
      const data = await this.fetcher(`/search/movie?query=${query}&language=en-US&page=${page}`)

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }

      throw new Error(String(error))
    }
  }

  async detail(id: string) {
    try {
      const data = await this.fetcher(`/movie/${id}?language=en-US`)

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }

      throw new Error(String(error))
    }
  }
}

export default new Movie()
