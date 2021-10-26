import mongoose from "mongoose";

const MyObjectId = mongoose.Types.ObjectId;

let status = ['DRAFT', 'SELLING', 'SOLD', 'SHIPPED'] 

const stampSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [String],
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
    },
    status:{
        type: String,
        enum: status,
        required: true,
        default: status[0]
    },
    seller:{
        type: MyObjectId,
        ref: 'User',
        required: true
    },
    isBlocked:{
        type: Date
    },
    blockingUser:{
        type: MyObjectId,
        ref: 'User'
    }


}, {
    timestamps: true
})

const Stamp = mongoose.model('Stamp', stampSchema)

export default Stamp