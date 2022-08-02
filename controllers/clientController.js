import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import Client from "../models/Client.js";

const getAllClients = async (req, res) => {

    const clients = await Client.find({})

    res.status(StatusCodes.OK).json({ clients })
}

const editClient = async (req, res) => {
    const { id: clientId } = req.params

    const client = await Client.findById(clientId)

    if (!client) {
        throw new NotFoundError(`there is no client with the ${clientId}`)
    }

    res.status(StatusCodes.OK).json({ client })
}

const deleteClient = async (req, res) => {
    const { id: clientId } = req.params

    const client = await Client.findById(clientId)

    if (!client) {
        throw new NotFoundError(`there is no client with the ${clientId}`)
    }

    res.send("delete client")
}


export { getAllClients, editClient, deleteClient }