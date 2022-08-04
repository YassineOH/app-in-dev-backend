import express from "express"

import { addService, updateService, deleteService, getAllServices } from "../controllers/serviceController.js";
import AuthMiddleware from "../middleware/auth.js"

const router = express.Router()

router.route("/").post(addService).get(AuthMiddleware, getAllServices)
router.route("/:id").patch(AuthMiddleware, updateService).delete(AuthMiddleware, deleteService)

export default router
