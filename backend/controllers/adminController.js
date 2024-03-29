
import asyncHandler from 'express-async-handler'
import Stamp from '../models/stampModel.js'
import User from '../models/userModel.js'

// @desc   Get users list
// @route  GET /api/admin/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
    const query = User.find({}).select('-password')
    const count = await User.find().merge(query).countDocuments()
    const users = await query.skip(req.query.pageSize * (req.query.pageNumber - 1)).limit(Number(req.query.pageSize))
    const data = { "data": users, total: count, page:  Number(req.query.pageNumber) - 1  }
    res.status(200).json(data)
})

// @desc   Update user profile
// @route  PUT /api/users/profile/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.role = req.body.role || user.role
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const getStampsAdmin = asyncHandler(async (req, res) => {
    const query = Stamp.find({})
    const count = await Stamp.find().merge(query).countDocuments()
    const stamps = await query.skip(req.query.pageSize * (req.query.pageNumber - 1)).limit(Number(req.query.pageSize))
    const data = { "data": stamps, total: count, page: Number(req.query.pageNumber) - 1 }
    res.status(200).json(data)
})

export {
    getUsers,
    updateUser,
    getStampsAdmin
}