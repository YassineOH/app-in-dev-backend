import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"

import { UnauthorizedError, BadRequestError } from "../errors/index.js"

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError("please provide all values")
    }

    const candidateUser = await User.findOne({ email })

    if (!candidateUser) {
        throw new BadRequestError("the email or the password are incorrect")
    }

    const isPasswordMatch = await candidateUser.comparePassword(password)
    if (!isPasswordMatch) {
        throw new BadRequestError("the email or the password are incorrect")
    }

    const { name, token, role } = candidateUser.createJWT()

    res.status(StatusCodes.OK).json({ token, name, role })

}


const register = async (req, res) => {
    const { email, password, name, phoneNumber } = req.body

    if (!email || !password || !name || !phoneNumber) {
        throw new BadRequestError("please provide all values")
    }

    const authorizedEmailUser = (process.env.ADMIN_EMAIL).split(",")

    if (!authorizedEmailUser.includes(email)) {
        throw new UnauthorizedError("you're not allowed to register as an admin")
    }


    const userAlreadyExist = await User.findOne({ email })

    if (userAlreadyExist) {
        throw new BadRequestError("You have already an account please logged in")
    }

    await User.create({
        email,
        name,
        phoneNumber,
        password,
        role: "admin"
    })

    res.status(StatusCodes.CREATED).json({ msg: "you're successfully register please logged in" })
}


export { register, login }