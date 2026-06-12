import type { Request, Response } from 'express'
import movie from './service'

class Controller {
  async list(req: Request, res: Response) {
    const { type = 'now_playing', page = 1 } = req.query

    const data = await movie.list(type as string, Number(page))
    res.json(data)
  }

  async search(req: Request, res: Response) {
    const { query, page = 1 } = req.query

    const data = await movie.search(query as string, Number(page))
    res.json(data)
  }

  async detail(req: Request, res: Response) {
    const { id } = req.params

    const data = await movie.detail(id as string)
    res.json(data)
  }
}

export default new Controller()
