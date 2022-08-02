import mongoose from "mongoose"

const ClientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        minlength: 5
    },

    phoneNumber: {
        type: String,
        required: [true, "please provide a phone number"],
    },

    city: {
        type: String,
        required: [true, "please provide a city"]
    },

    address: {
        type: String,
        required: [true, "please provide an address"]
    }

})


export default mongoose.model("Client", ClientSchema)