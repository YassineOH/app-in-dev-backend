import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"

import { createUserToken } from "../utils/index.js"

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },

    phoneNumber: {
        type: String,
        required: [true, "please provide a phone number"],
    },

    city: {
        type: String,
        required: [true, "please provide a city"],
        default: "rabat"
    },

    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: "please provide a valid email"
        },
        unique: true
    },

    role: {
        type: String,
        enum: ["admin"],
        required: [true, "please provide a role"],
        default: "admin"
    },

    address: {
        type: String,
        required: [true, "please provide an address / City"],
        default: "rabat"
    },
    password: {
        type: String
    }
})


UserSchema.methods.createJWT = function () {
    return {
        token: createUserToken({ id: this._id }),
        name: this.name,
        role: this.role,
    }
}


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


UserSchema.pre("save", async function () {

    if (!this.password) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model("User", UserSchema)