import express from 'express'
import { addStamp, deleteStamp, getStamps, updateStamp } from '../controllers/stampsController.js'
import { protect } from '../middleware/authMiddleware.js'
import { sellerMW } from '../middleware/sellerMiddleware.js'

const router = express.Router()

router.route('/').get(getStamps)
router.route('/').post(protect, sellerMW, addStamp)
router.route('/:id').delete(protect, sellerMW, deleteStamp)
router.route('/:id').put(protect, sellerMW, updateStamp)

export default router