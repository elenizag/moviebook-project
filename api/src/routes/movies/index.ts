import { Router } from 'express'
import controller from './controller'

const router: Router = Router()

router.get('/list', controller.list)
router.get('/search', controller.search)
router.get('/:id', controller.detail)

export default router