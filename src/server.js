import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.middleware.js'
import ejs from 'ejs'
import verifyToken from './middleware/verifyToken.js'
import loginRoutes from './routes/login.routes.js'
import adminRoutes from './routes/admin.routes.js'
import studentsRoutes from './routes/students.routes.js'
import teachersRoutes from './routes/teachers.routes.js'
import coursesRoutes from './routes/courses.routes.js'
import groupsRoutes from './routes/groups.routes.js'
dotenv.config()


const app = express()
app.use(express.urlencoded())
app.use(cookieParser())
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views',path.join(process.cwd(), 'src','views'))
app.use('/assets', express.static(path.join(process.cwd(), 'src', 'assets')))

app.use(loginRoutes)
app.use(verifyToken)
app.use(adminRoutes)
app.use(teachersRoutes)
app.use(studentsRoutes)
app.use(coursesRoutes)
app.use(groupsRoutes)
app.use(errorHandler)









app.use('/*', (_, res) =>{
    res.render('notfound.ejs')
})

app.listen(9494, console.log(9494))
