import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateTokens.js";

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc   Register a new user
// @route  POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    console.log(name, email, password)
    const userExists = await User.findOne({ email })
    
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    if(!name){
        res.status(400)
        throw new Error("Name is Required")
    }
    if(!email){
        res.status(400)
        throw new Error("Email is Required")
    }
    if(!password){
        res.status(400)
        throw new Error("Password is Required")
    }

    const user = await User.create({ name, email, password })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User Data")
    }
})



// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }
})


// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: user.role,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile
}