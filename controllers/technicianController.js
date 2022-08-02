import Technician from "../models/Technician.js"

import { BadRequestError, NotFoundError } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"



const getAllTechnicians = async (req, res) => {

    const technicians = await Technician.find({})

    res.status(StatusCodes.OK).json({ technicians })
}



const addTechnician = async (req, res) => {
    const { firstName, lastName, phoneNumber, city, mainService } = req.body

    if (!firstName || !lastName || !phoneNumber || !city || !mainService) {
        throw new BadRequestError("please provide all values")
    }

    const alreadyExist = await Technician.find({ firstName, lastName })


    if (alreadyExist.length !== 0) {
        throw new BadRequestError(`${firstName} ${lastName} is already exist as technician`)
    }

    await Technician.create({ firstName, lastName, phoneNumber, city, mainService })

    res.status(StatusCodes.CREATED).json({ msg: "the technician created successfully" })
}




const editTechnician = async (req, res) => {
    const { id: technicianId } = req.params
    const { technician: newTechnician } = req.body
    const technician = await Technician.findById(technicianId)

    if (!technician) {
        throw new NotFoundError(`there is no technician with this id: ${technicianId}`)
    }
    await Technician.findOneAndUpdate({ _id: technician }, newTechnician, {
        runValidators: true,
        new: true
    })


    res.status(StatusCodes.OK).json({ msg: "the technician's information updated successfully" })
}



const deleteTechnician = async (req, res) => {
    const { id: technicianId } = req.params

    const technician = await Technician.findById(technicianId)

    if (!technician) {
        throw new NotFoundError(`there is no technician with this id: ${technicianId}`)
    }

    await technician.remove()

    res.status(StatusCodes.OK).json({ msg: "technician deleted successfully" })
}



export { getAllTechnicians, addTechnician, editTechnician, deleteTechnician }