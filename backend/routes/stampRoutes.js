import express from 'express'
import { addStamp, deleteStamp, getStamps, updateStamp } from '../controllers/stampsController.js'

const router = express.Router()

router.route('/').get(getStamps)
router.route('/').post(addStamp)
router.route('/:id').delete(deleteStamp)
router.route('/:id').put(updateStamp)

export default router