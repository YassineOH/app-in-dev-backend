import express from "express"

import { getAllTechnicians, addTechnician, editTechnician, deleteTechnician } from "../controllers/technicianController.js"


const router = express.Router()


router.route("/").get(getAllTechnicians).post(addTechnician)
router.route("/:id").patch(editTechnician).delete(deleteTechnician)


export default router