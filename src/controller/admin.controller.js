import { ErrorHandler } from "../errors/errorHandler.js"
import { read, write } from "../utils/FS.js"


export const getAdmin = async(req, res, next) => {

    const allUsers = await read('users.json').filter(e=> e.role == "admin")
    res.render('admin.ejs',{
        allUsers:allUsers
    })
}



///STUDENT SIDE

export const getStudents = async(req, res, next) => {

    const allGroups = await read('groups.json')
    const allUsers = await read('users.json').filter(e=> e.role == "student")
    const allCourses = await read('courses.json')
    res.render('admin.student.ejs', {
        allCourses: allCourses,
        allUsers:allUsers,
        allGroups:allGroups
    })

}
export const postStudents = async (req, res, next) => {

    const { name, username, password, role='student', course, tel, group } = req.filtered

    const allUsers = await read('users.json')
    const foundUser = allUsers.find(e => e.username == username)


    if (foundUser) {
        return next(new ErrorHandler("This username is already used", 405))
    }
    allUsers.push({ id: allUsers?.at(-1).id + 1 || 1, name, username, password, role, course, tel, group })

    const newUser = await write('users.json', allUsers)
    if (newUser) {
        return res.redirect('/admin/student')
    }

}

export const deleteStudents = async(req, res, next) =>{

    const { id } = req.params
    const allUsers = await read('users.json')
    allUsers.splice(allUsers.findIndex(e => e.id == id),1)

    await write('users.json', allUsers, null, 4)
    res.redirect('/admin/student')
}

///TEACHER SIDE

export const getTeachers = async(req, res, next) => {

    const allUsers = await read('users.json').filter(e=> e.role == "teacher")
    const allCourses = await read('courses.json')
    res.render('admin.teacher.ejs', {
        allCourses: allCourses,
        allUsers: allUsers
    })
}

export const postTeachers = async(req, res, next) => {

    const { name, username, password, role='teacher', groupId=[], field, tel } = req.filtered
    const allGroups = await read('groups.json').map(e=>{
        if(e.teacher == name){
            groupId.push(e.id)
        }
    })
    const allUsers = await read('users.json')
    const foundUser = allUsers.find(e => e.username == username)


    if (foundUser) {
        return next(new ErrorHandler("This username is already used", 405))
    }
    allUsers.push({ id: allUsers?.at(-1).id + 1 || 1, name, username, password, groupId, role, field, tel })

    const newUser = await write('users.json', allUsers)
    if (newUser) {
        return res.redirect('/admin/teacher')
    }
}

///COURSES SIDE

export const getCourses = async(req, res, next) => {

    const allCourses = await read('courses.json')
    res.render('admin.course.ejs', {
        allCourses:allCourses
    })
}

export const postCourses = async (req, res, next) =>{

    const { title, price, description } = req.filtered

    const allCourses = await read('courses.json')

    allCourses.push({ id: allCourses?.at(-1).id + 1 || 1, title, price, description })

    const newCourse = await write('courses.json', allCourses)
    if (newCourse) {
        return res.redirect('/admin/course')
    }
}

export const deleteCourses = async(req, res, next) => {
    const { id } = req.params
    const allCourses = await read('courses.json')
    allCourses.splice(allCourses.findIndex(e => e.id == id),1)

    await write('courses.json', allCourses, null, 4)
    res.redirect('/admin/course')
}

export const getGroups = async(req, res, next) => {

    const allGroups = await read('groups.json')
    const allCourses = await read('courses.json')
    const allUsers = await read('users.json').filter(e=> e.role == "teacher")
    res.render('admin.group.ejs', {
        allCourses: allCourses,
        allUsers:allUsers,
        allGroups:allGroups
    })
}

export const postGroups = async(req, res, next) => {

    const { name, type, teacher, days, time } = req.filtered

    const allGroups = await read('groups.json')
    allGroups.push({ id: allGroups?.at(-1).id + 1 || 1, name, type, teacher, days, time })

    const newGroup = await write('groups.json', allGroups)
    // const groupTeacher = await read('users.json').filter(e=> e.name == teacher)
    if (newGroup) {
        return res.redirect('/admin/group')
    }
}


export const deleteGroup = async(req, res, next) =>{

    const { id } = req.params

    const allGroups = await read('groups.json')
    allGroups.splice(allGroups.findIndex(e => e.id == id),1)

    await write('groups.json', allGroups, null, 4)
    res.redirect('/admin/group')

}