import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
    mainService: {
        type: String,
        required: [true, "please provide a main service"]
    },
    subService: {
        type: String,
        required: [true, "please provide a sub service"]
    },

    date: {
        type: Date
    },

    status: {
        enum: ["pending", "completed", "declined"],
        default: "pending",
        type: String
    },

    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "Client"
    },

    handledBy: {
        type: mongoose.Types.ObjectId,
        ref: "Technician",
        default: null
    }
}, { timestamps: true })


export default mongoose.model("Service", ServiceSchema)