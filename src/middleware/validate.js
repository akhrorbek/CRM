import { ErrorHandler } from "../errors/errorHandler.js"

export default (scheme) => {
    return (req, res, next) => {
        const { error, value } = scheme.validate(req.body)
        if(error) {
            return next(new ErrorHandler(error.message, 400))
        }
        req.filtered = value

        next()
    }
}