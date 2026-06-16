import type { Request, Response } from 'express'
import movie from './service'

class Controller {
  async list(req: Request, res: Response) {
    const type = req.query.type as string || 'now_playing'
    const page = req.query.page as string || '1'

    const data = await movie.list(type, page)

    return res.json(data)
  }

  async search(req: Request, res: Response) {
    const query = req.query.query as string
    const page = req.query.page as string || '1'

    const data = await movie.search(query, page)

    return res.json(data)
  }

  async detail(req: Request, res: Response) {
    const { id } = req.params
    const data = await movie.detail(id as string)

    return res.json(data)
  }
}

export default new Controller()
