export const errorHandler =(err, req, res, next) =>{
    return res.render('errors.ejs', {
        status: err.status,
        message: err.message
    })
}