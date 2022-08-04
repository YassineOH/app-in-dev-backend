import Client from "../models/Client.js"
import Service from "../models/Service.js"

import { BadRequestError, NotFoundError } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"


const getAllServices = async (req, res) => {
    const services = await Service.find({}).populate({ path: "postedBy", select: "name _id" }).sort("-createdAt")

    res.status(StatusCodes.OK).json({ services, count: services.length })
}

const addService = async (req, res) => {
    const { user, service } = req.body

    if (!user || !service) {
        throw new BadRequestError("please provide all values")
    }

    const { name, phoneNumber, city, address } = user

    const isClientExist = await Client.findOne({ phoneNumber, name })

    let clientId = ""
    let client = {}

    if (isClientExist) {
        clientId = isClientExist._id
        client = isClientExist
    } else {
        const newClient = await Client.create({
            city,
            address,
            name,
            phoneNumber,
        })
        clientId = newClient._id
        client = newClient
    }


    const { mainService, subService, date } = service

    const serviceUser = await Service.create({
        mainService,
        subService,
        date: new Date(date),
        postedBy: clientId
    })

    res.status(StatusCodes.CREATED).json({ client, serviceUser })
}


const updateService = async (req, res) => {
    const { id: serviceId } = req.params
    const { service: newService } = req.body
    const service = await Service.findById(serviceId)


    if (!service) {
        throw new NotFoundError(`there is no service with the following id: ${serviceId}`)
    }

    if (Object.keys(req.body).length === 0) {
        throw new BadRequestError("please provide some values to update")
    }
    await Service.findOneAndUpdate({ _id: serviceId }, newService, {
        runValidators: true,
        new: true
    })

    res.status(StatusCodes.OK).json({ msg: "the service update successfully" })

}


const deleteService = async (req, res) => {
    const { id: serviceId } = req.params

    const service = await Service.findById(serviceId)
    if (!service) {
        throw new NotFoundError(`there is no service with the following id: ${serviceId}`)
    }
    await service.remove()

    res.status(StatusCodes.OK).json({ msg: "service is deleted" })
}

export { addService, updateService, deleteService, getAllServices }