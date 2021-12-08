import mongoose from "mongoose";


const expertiseSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },


}, {
    timestamps: true
})

const Expertise = mongoose.model('Expertise', expertiseSchema)

export default Expertise