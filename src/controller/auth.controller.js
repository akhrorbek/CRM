import { ErrorHandler } from '../errors/errorHandler.js'
import { read } from '../utils/FS.js'
import { sign } from '../utils/jwt.js'


export const getLogin = (req, res, next) => {
    res.render('login.ejs')
}


export const postlogin = async (req, res, next) =>{

    const { username, password } = req.filtered

    const allUsers = await read('users.json')

    const foundUser = allUsers?.find(e => e.username == username && e.password == password)
    if(!foundUser) {
        return next(new ErrorHandler("User not found", 404))
    }
    if(foundUser.role == 'admin') {
        res.cookie("access_token", sign({id: foundUser?.id, role: foundUser.role}) )
        return res.redirect('/admin')
    }

    if(foundUser.role == 'teacher') {
        res.cookie("access_token", sign({id: foundUser?.id, role: foundUser.role, name: foundUser.name}) )
        return res.redirect('/teacher')
    }

    if(foundUser.role == 'student') {
        res.cookie("access_token", sign({id: foundUser?.id, role: foundUser.role, name:foundUser.name}) )
        return res.redirect('/student')
    }

}
