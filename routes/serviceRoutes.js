import express from "express"

import { addService, updateService, deleteService, getAllServices } from "../controllers/serviceController.js";

const router = express.Router()

router.route("/").post(addService).get(getAllServices)
router.route("/:id").patch(updateService).delete(deleteService)

export default router
