import express from 'express'
import { authUser,registerUser, getUserProfile, updateUserProfile, getUsers } from "../controllers/userController.js";
import { adminMW } from '../middleware/adminMiddleware.js';
import { protect } from "../middleware/authMiddleware.js";
import { sellerMW } from '../middleware/sellerMiddleware.js';
const router = express.Router()

router.post('/', registerUser)
router.route('/').get(protect, adminMW, getUsers)
router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)


export default router