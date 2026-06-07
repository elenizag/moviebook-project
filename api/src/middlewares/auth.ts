import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { schema } from '../lib/database'

async function auth(req: Request, res: Response, next: NextFunction) {
  const APP_KEY = process.env.APP_KEY || ''

  if (!APP_KEY) throw new Error('APP_KEY is required')

  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const decoded = jwt.verify(token, APP_KEY) as { id: string }

    const user = await schema.User.findById(decoded.id).lean()

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Not authorized' })
  }
}

export default auth
