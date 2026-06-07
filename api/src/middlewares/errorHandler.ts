import { type Request, type Response, type NextFunction } from 'express'
import { HttpError, ValidationError } from '../utils/errors'

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if it's a ValidationError
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
      errors: error.errors,
    })
  }

  // Check if it's a custom HttpError
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    })
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
      statusCode: 401,
    })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired',
      statusCode: 401,
    })
  }

  // Handle MongoDB validation errors
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors)
      .map((err: any) => err.message)
      .join(', ')

    return res.status(400).json({
      message: messages || 'Validation error',
      statusCode: 400,
    })
  }

  // Handle MongoDB duplicate key errors
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]

    return res.status(409).json({
      message: `${field} already exists`,
      statusCode: 409,
    })
  }

  // Default error response
  res.status(500).json({
    message: error.message || 'Internal server error',
    statusCode: 500,
  })
}

export default errorHandler
