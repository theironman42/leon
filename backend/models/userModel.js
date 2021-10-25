import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

let role = ['USER', 'SELLER', 'ADMIN', 'SUPERADMIN']
const MyObjectId = mongoose.Types.ObjectId;


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: role,
        required: true,
        default: 'USER'
    },
    cart:{
        products: {
            type: [MyObjectId],
            ref: 'Stamp'
        },
        total:{
            type: Number,
            default: async function () {
                let total = 0;
                const itemsArray = await Stamp.find({'_id': {$in: this.cart.products}})
                itemsArray.forEach(stamp => {
                    total += stamp.price
                });
                return total
            }
        }
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User