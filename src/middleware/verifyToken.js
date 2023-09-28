import jwt from "jsonwebtoken"
import { ErrorHandler } from "../errors/errorHandler.js"

export default (req, res, next) =>{
    const { access_token } = req.cookies

    if(!access_token) {
        return next(new ErrorHandler("Provide token", 401))
    }

    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) =>{
        if(err instanceof jwt.JsonWebTokenError)
        return next(new ErrorHandler("Invalid token", 401))

        req.userId = decode.id
        req.userRole = decode.role
        req.userName = decode.name
        next()
    })
}