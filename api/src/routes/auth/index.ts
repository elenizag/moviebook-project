import { Router } from 'express'
import { validator, auth } from '../../middlewares'
import schema from './schema'
import controller from './controller'

const router: Router = Router()

router.post('/login', validator(schema.login), controller.login)
router.post('/register', validator(schema.register), controller.register)
router.post('/logout', auth, controller.logout)
router.get('/me', auth, controller.me)

export default router
