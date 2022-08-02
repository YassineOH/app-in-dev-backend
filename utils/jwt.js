import jwt from "jsonwebtoken"

export const createUserToken = ({ id }) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)