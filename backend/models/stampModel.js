import mongoose from "mongoose";

const stampSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    country: {
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
    price: {
        type: Number,
        required: true,
        default: 0
    }


}, {
    timestamps: true
})

const Stamp = mongoose.model('Stamp', stampSchema)

export default Stamp