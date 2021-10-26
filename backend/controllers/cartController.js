
import asyncHandler from 'express-async-handler'
import Stamp from '../models/stampModel.js'
import User from '../models/userModel.js'

// @desc   Get cart
// @route  GET /api/cart
// @access Private
const getCart = asyncHandler(async (req, res) => {
    const cart = req.user.cart
    let total = 0
    const itemsArray = await Stamp.find({'_id': {$in: cart.products}})
    itemsArray.forEach(stamp => {
        total += stamp.price
    });
    console.log("itemsArray", itemsArray)
    cart.products = itemsArray
    res.status(200).json({total: total, products: itemsArray})
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
    const indexToDelete = user.cart.products.indexOf(req.body.productId)
    user.cart.products.splice(indexToDelete, 1)
    const updatedUser = user.save()
    res.status(200).json(updatedUser.cart)
})

export {
    getCart,
    addToCart,
    removeFromCart
}