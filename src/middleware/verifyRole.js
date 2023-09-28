import { ErrorHandler } from "../errors/errorHandler.js"

export default (role) =>{
    return (req, res, next) =>{
        const { userRole } = req

        if(userRole != role.toLowerCase()) {
            return next(new ErrorHandler("You are not permitted", 401))
        }
        next()
    }
}