import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'

const sellerMW = asyncHandler(async (req, res, next) => {
    let user = req.user

    if (user) {
        if (user.role === "SELLER") {
            next()
        } else {
            res.status(401)
            throw new Error('Not authorized, seller only page')
        }
    }

    if (!user) {
        res.status(401)
        throw new Error('Not authorized, no user identified')
    }


})

export {
    sellerMW
}