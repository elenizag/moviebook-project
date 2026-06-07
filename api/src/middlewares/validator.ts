import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'
import { ValidationError } from '../utils/errors'

const validate = (schema: ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseData: Record<string, any> = {
        body: req.body
      }

      const result = schema.safeParse(parseData)

      if (!result.success) {
        const errors: Record<string, string> = {}

        result.error.issues.forEach((error) => {
          const field = error.path[error.path.length - 1]?.toString() || 'unknown'
          
          if (!errors[field]) {
            errors[field] = error.message
          }
        })

        return next(new ValidationError(errors))
      }

      req.body = result.data.body

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validate
