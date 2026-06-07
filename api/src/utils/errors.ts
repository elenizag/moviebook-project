export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestError extends HttpError {
  public errors?: Record<string, string>
  public skipErrorMessage?: boolean

  constructor(message: string | Record<string, string> = 'Bad Request', skipErrorMessage = false) {
    const messageStr = typeof message === 'string' ? message : 'Validation failed'
    super(400, messageStr)
    if (typeof message === 'object' && !Array.isArray(message)) {
      this.errors = message
    }
    this.skipErrorMessage = skipErrorMessage
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(401, message)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(403, message)
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found') {
    super(404, message)
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal Server Error') {
    super(500, message)
  }
}
