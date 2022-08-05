import { StatusCodes } from "http-status-codes"


// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    const defaultError = {
        msg: err.message || "something went wrong, please try again later",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if (err?.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(err.errors).map(err => err.message).join(", ")
    }

    if (err?.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `these fields must be unique: [${Object.keys(err.keyValue).join(", ")}]`
    }


    res.status(defaultError.statusCode).json({ msg: defaultError.msg })

}


export default errorHandlerMiddleware