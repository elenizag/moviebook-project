import { Router } from 'express'
import { validator, auth } from '../../middlewares'
import schemas from './schema'
import controller from './controller'

const router: Router = Router()

router.post('/login', validator(schemas.login), controller.login)
router.post('/register', validator(schemas.register), controller.register)
router.post('/logout', auth, controller.logout)
router.get('/me', auth, controller.me)

export default router
