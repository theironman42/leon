import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .get(protect, getCart)
    .delete(protect, removeFromCart)
    .put(protect, addToCart)

export default router