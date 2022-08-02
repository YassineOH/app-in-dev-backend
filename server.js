import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import "express-async-errors"


import authRoutes from "./routes/authRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"
import clientRoutes from "./routes/clientRoutes.js"
import technicianRoutes from "./routes/technicianRoutes.js"

import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import authMiddleware from "./middleware/auth.js"

import connectDB from "./db/connectDB.js"

// Security packages
import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"

// limiter

import rateLimiter from "express-rate-limit"

// serve static assets (client folder)

import path, { dirname } from "path"
import { fileURLToPath } from "url"





const __dirname = dirname(fileURLToPath(import.meta.url))

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 20,
    message: "to many request from this api please try later after 15 min"
})


// Routes
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "./client/dist")))
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())


app.use("/api/v1/auth", apiLimiter, authRoutes)
app.use("/api/v1/services", authMiddleware, serviceRoutes)
app.use("/api/v1/clients", authMiddleware, clientRoutes)
app.use("/api/v1/technicians", authMiddleware, technicianRoutes)


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"))
})

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}

app.get("/", async (req, res) => {
    res.json({ msg: "hello sir the application is running" })
})


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`the server is running on port: ${port}...`)
        })

    } catch (error) {
        console.log(error)
    }
}



start()