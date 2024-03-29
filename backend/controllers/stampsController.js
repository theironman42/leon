import asyncHandler from 'express-async-handler'
import Stamp from '../models/stampModel.js'
import { unlinkAsync } from '../routes/uploadRoutes.js'

//GET gets stamps in database
// @route GET /api/stamps
const getStamps = asyncHandler(async (req, res) => {
    const query = Stamp.find({}).where('status').equals('SELLING')
    const count = await Stamp.find().merge(query).countDocuments()
    const stamps = await query.skip(req.query.pageSize * (req.query.pageNumber - 1)).limit(Number(req.query.pageSize))
    const data = { "data": stamps, total: count, page: Number(req.query.pageNumber) - 1 }
    res.status(200).json(data)
})

//POST add a stamp to the db
// @route /api/stamps
const addStamp = asyncHandler(async (req, res) => {
    const { name, images, country, description, price, reference, user, status } = req.body
    const stamp = await Stamp.create({ name, images, country, description, price, reference, seller: req.user._id, status })
    res.status(200).json(stamp)
})

//DELETE delete a stamp from db by id
// @route /api/stamps/:id

const deleteStamp = asyncHandler(async (req, res) => {
    const { id } = req.params
    const stamp = await Stamp.findById(id)
    if (stamp) {
        stamp.delete()
        res.status(200).json(stamp)
    } else {
        res.status(404)
        throw new Error("Stamp not found")
    }
})

//PUT change a stamps attributes
// @route /api/stamps/:id

const updateStamp = asyncHandler(async (req, res) => {
    const { id } = req.params
    const stamp = await Stamp.findById(id)
    console.log("passed here ", req.body.status)
    if (stamp) {
        let imagesArray = req.body.images || stamp.images
        let removedImages = stamp.images.filter(x => !imagesArray.includes(x))
        await removedImages.forEach((item) => {
            unlinkAsync(`uploads/${item.slice(7)}`)
        });

        stamp.name = req.body.name || stamp.name
        stamp.country = req.body.country || stamp.country
        stamp.description = req.body.description || stamp.description
        stamp.price = req.body.price || stamp.price
        stamp.reference = req.body.reference || stamp.reference
        stamp.status = req.body.status || stamp.status
        stamp.images = imagesArray
        try {
            const updatedStamp = await stamp.save()
            res.status(200).json(updatedStamp)
        } catch (error) {
            console.log(error)
            res.status(500).json({error:{message: error._message}})
        }
        
    } else {
        res.status(404)
        throw new Error("Stamp not found")
    }
})

const getStampDetail = asyncHandler(async (req, res) => {
    const id = req.params.id
    const stamp = await Stamp.findById(id)
    if (stamp) {
        res.status(200).json(stamp)
    } else {
        res.status(404)
        throw new Error("Stamp not found")
    }

})

export {
    getStamps,
    addStamp,
    deleteStamp,
    updateStamp,
    getStampDetail
}