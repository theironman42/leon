
import asyncHandler from 'express-async-handler'
import { startSession } from 'mongoose'
import Stamp from '../models/stampModel.js'
import User from '../models/userModel.js'

const BLOCKED_STAMP_TIME = 15

// @desc   Get cart
// @route  GET /api/cart
// @access Private
const getCart = asyncHandler(async (req, res) => {
    const cart = req.user.cart
    const itemsArray = await Stamp.find({'_id': {$in: cart.products}})
    
    cart.products = itemsArray
    res.status(200).json({total: cart.total, products: itemsArray})
})

// @desc   Add item to cart
// @route  PUT /api/cart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    const id = user.cart.products.indexOf(req.body.productId)
    if (id < 0) {
        user.cart.products.push(req.body.productId)
        const updatedUser = user.save()
        res.status(200).json(updatedUser.cart)
    }else
    res.status(200).json(user.cart)
    
})

// @desc   Delete item from cart
// @route  DELETE /api/cart
// @access Private
const removeFromCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    const indexToDelete = user.cart.products.indexOf(req.params.productId)
    user.cart.products.splice(indexToDelete, 1)
    const updatedUser = await user.save()
    const itemsArray = await Stamp.find({'_id': {$in: updatedUser.cart.products}})
    res.status(200).json({total: updatedUser.cart.total, products: itemsArray}).send()
})

//TODO TEST THIS FUNCTION
// @desc   Get cart
// @route  GET /api/cart/block
// @access Private
const blockCart = asyncHandler(async (req, res) => {
    //const session = startSession()
    
    const cart = req.user.cart
    const userId = req.user._id
    const itemsArray = await Stamp.find({'_id': {$in: cart.products}})
    let timeNow = Date.now() / (1000 * 60)
    itemsArray.forEach((stamp, index) => {
        const stampTime = stamp.isBlocked / (1000 * 60) 
        const difference = timeNow - stampTime
        if (difference > BLOCKED_STAMP_TIME || stamp.blockingUser === userId){
            stamp.blockingUser = userId
            stamp.isBlocked = timeNow
            stamp.save() 
        }else itemsArray.splice(index,1)
    });
    
    cart.products = itemsArray
    res.status(200).json({total: cart.total, products: itemsArray})
})

//TODO TEST THIS FUNCTION
// @desc   Get cart
// @route  GET /api/cart/block
// @access Private
const buyCart = asyncHandler(async (req, res) => {
    const cart = req.user.cart
    const userId = req.user._id
    const itemsArray = await Stamp.find({'_id': {$in: cart.products}})
    itemsArray.forEach((stamp, index) => {
        stamp.status='SOLD'
    });
    
    cart.products = itemsArray
    res.status(200).json({total: cart.total, products: itemsArray})
})



export {
    getCart,
    addToCart,
    removeFromCart
}