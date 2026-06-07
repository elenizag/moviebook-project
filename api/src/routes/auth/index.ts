import { Router } from 'express'
import controller from './controller'
import { validator, auth } from '../../middlewares'
import { loginSchema, registerSchema } from './schema'

const router: Router = Router()

router.post('/login', validator(loginSchema), controller.login)
router.post('/register', validator(registerSchema), controller.register)
router.post('/logout', auth, controller.logout)
router.get('/me', auth, controller.me)

export default router
