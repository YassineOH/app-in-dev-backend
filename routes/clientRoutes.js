import express from "express"

import { getAllClients, editClient, deleteClient } from "../controllers/clientController.js"

const router = express.Router()

router.get("/", getAllClients)
router.route("/:id").patch(editClient).delete(deleteClient)


export default router