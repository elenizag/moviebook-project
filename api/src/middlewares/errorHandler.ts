import type { Request, Response, NextFunction } from 'express'
import { HttpError, BadRequestError } from '../utils/errors'

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    const response: any = {}
    
    if (error instanceof BadRequestError && error.skipErrorMessage) {
      response.errors = error.errors
    } else {
      response.error = error.message
      
      if (error instanceof BadRequestError && error.errors) {
        response.errors = error.errors
      }
    }
    
    return res.status(error.statusCode).json(response)
  }

  console.error(error)
  res.status(500).json({
    error: 'Internal Server Error'
  })
}

export default errorHandler
