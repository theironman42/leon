import express from 'express'
import { authUser,registerUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { adminMW } from '../middleware/adminMiddleware.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()

router.post('/', registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)


export default router