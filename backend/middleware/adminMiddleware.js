import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'

const adminMW = asyncHandler(async (req, res, next) => {
    let user = req.user

    if (user) {
        if (user.role === "ADMIN") {
            next()
        } else {
            res.status(401)
            throw new Error('Not authorized, admin only page')
        }
    }

    if (!user) {
        res.status(401)
        throw new Error('Not authorized, no user identified')
    }


})

export {
    adminMW
}