import mongoose from "mongoose"

const TechnicianSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "please provide a first Name"],
    },

    lastName: {
        type: String,
        required: [true, "please provide a last name"]
    },

    mainService: {
        type: String,
        required: [true, "please provide a main service"]
    },

    phoneNumber: {
        type: String,
        required: [true, "please provide a phone number"]
    },

    city: {
        type: String,
        required: [true, "please provide a city"]
    }
})



export default mongoose.model("Technician", TechnicianSchema)