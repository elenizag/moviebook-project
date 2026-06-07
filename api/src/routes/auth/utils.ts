import jwt from 'jsonwebtoken'
import type { CookieOptions } from 'express'

const APP_KEY = process.env.APP_KEY || ''

if (!APP_KEY) throw new Error('APP_KEY is required')

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
}

export const generateToken = (id: string) => {
  return jwt.sign({ id }, APP_KEY, {
    expiresIn: '30d',
  })
}
