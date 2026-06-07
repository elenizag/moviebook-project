import { z } from 'zod'

export const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email format.'),
    password: z.string().min(8, 'Password must be at least 8 characters.')
  })
})

export type LoginInput = z.infer<typeof loginSchema>['body']

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters.'),
    username: z.string().min(4, 'Username must be at least 4 characters.'),
    email: z.email('Invalid email format.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    password_confirmation: z.string().min(8, 'Password confirmation must be at least 8 characters.'),
  }).refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation']
  })
})

export type RegisterInput = z.infer<typeof registerSchema>['body']

