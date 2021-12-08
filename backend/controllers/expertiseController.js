import Expertise from "../models/expertiseModels.js"
import asyncHandler from 'express-async-handler'

//POST add an expertise to the db
// @route POST /api/admin/expertise
const addExpertise = asyncHandler(async (req, res) => {
    const { image, description, reference } = req.body
    const expertise = await Expertise.create({ image: image[0], description, reference })
    res.status(200).json(expertise)
})

//DELETE delete a expertise from db by id
// @route /api/admin/expertise/:id

const deleteExpertise = asyncHandler(async (req, res) => {
    const { id } = req.params
    const expertise = await Expertise.findById(id)
    if (expertise) {
        expertise.delete()
        res.status(200).json(expertise)
    } else {
        res.status(404)
        throw new Error("Expertise not found")
    }
})

//GET gets expertise in database with a query
// @route GET /api/expertise
const getExpertises = asyncHandler(async (req, res) => {
    const query = Expertise.find({})
    const count = await Expertise.find().merge(query).countDocuments()
    const expertises = await query.skip(req.query.pageSize * (req.query.pageNumber - 1)).limit(Number(req.query.pageSize))
    const data = { "data": expertises, total: count, page: Number(req.query.pageNumber) - 1 }
    res.status(200).json(data)
})


//PUT change an expertise attributes
// @route /api/expertise/:id

const updateExpertise = asyncHandler(async (req, res) => {
    const { id } = req.params
    const expertise = await Expertise.findById(id)
    if (expertise) {
        let newImage = req.body.image;
        if (newImage !== expertise) {
            unlinkAsync(`uploads/${expertise.slice(7)}`)
        }

        expertise.description = req.body.description || expertise.description
        expertise.reference = req.body.reference || expertise.reference
        expertise.image = newImage || expertise.image
        try {
            const updatedExpertise = await expertise.save()
            res.status(200).json(updatedExpertise)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: { message: error._message } })
        }

    } else {
        res.status(404)
        throw new Error("Expertise not found")
    }
})

const getExpertiseDetail = asyncHandler(async (req, res) => {
    const id = req.params.id
    const expertise = await Expertise.findById(id)
    if (expertise) {
        res.status(200).json(expertise)
    } else {
        res.status(404)
        throw new Error("Expertise not found")
    }

})

export {
    addExpertise,
    getExpertises,
    updateExpertise,
    getExpertiseDetail,
    deleteExpertise
}