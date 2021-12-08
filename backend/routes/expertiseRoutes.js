import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { addExpertise, deleteExpertise, getExpertiseDetail, getExpertises, updateExpertise } from '../controllers/expertiseController.js'
import { sellerMW } from '../middleware/sellerMiddleware.js'
const router = express.Router()

router.route('/:id').get(getExpertiseDetail)
router.route('/').get(getExpertises)
router.route('/').post(protect, sellerMW, addExpertise)
router.route('/:id').delete(protect, sellerMW, deleteExpertise)
router.route('/:id').put(protect, sellerMW, updateExpertise)

export default router