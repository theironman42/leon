
import express from 'express'
import { getUsers, updateUser } from '../controllers/adminController.js';
import { adminMW } from '../middleware/adminMiddleware.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/users/:id').put(protect, adminMW, updateUser)
router.route('/users').get(protect, adminMW, getUsers)


export default router