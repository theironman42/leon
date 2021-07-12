import asyncHandler from 'express-async-handler'
import Stamp from '../models/stampModel.js'

//GET gets stamps in database
//TODO make it work with a query (nb of items per page ...)
// @route GET /api/products
const getStamps = asyncHandler(async (req, res) =>{
    const stamps = await Stamp.find({})
    res.json(stamps)
})

const addStamp = asyncHandler(async (req, res) =>{
    const { name, image, country, description, price } = req.body
    const stamp = await Stamp.create({ name, image, country, description, price })
    res.status(200).json()
})

const deleteStamp = asyncHandler(async (req, res) =>{
    const {id} = req.params
    const stamp = await Stamp.findById(id)
    console.log(id, stamp)
    if(stamp){
        stamp.delete()
        res.status(200).json(stamp)
    }else{
        res.status(404)
        throw new Error("Stamp not found")
    }
})

const updateStamp = asyncHandler(async (req, res) =>{
    const {id} = req.params
    const stamp = await Stamp.findById(id)
    console.log(id, stamp)
    if(stamp){
        stamp.name = req.body.name || stamp.name
        stamp.image = req.body.image || stamp.image
        stamp.country = req.body.country || stamp.country
        stamp.description = req.body.description || stamp.description
        stamp.price = req.body.price || stamp.price
        const updatedStamp = await stamp.save()
        res.status(200).json(updatedStamp)
        console.log(updatedStamp)
    }else{
        res.status(404)
        throw new Error("Stamp not found")
    }
})

export {
    getStamps,
    addStamp,
    deleteStamp,
    updateStamp
}