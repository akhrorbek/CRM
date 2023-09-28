import { ErrorHandler } from "../errors/errorHandler.js"
import { read, write } from "../utils/FS.js"

export const getTeacher = async (req, res, next) => {
    const name = req.userName
    const allUsers = await read('users.json').filter(e => e.role == "teacher" && e.name == name)
    res.render('teacher.ejs', {
        allUsers: allUsers
    })
}




export const getGroup = async (req, res, next) => {
    const name = req.userName
    let teacherGroups = []
    const allGroups = read('groups.json')
    const allUsers = await read('users.json').filter(e => e.role == "teacher" && e.name == name).map(e => e.groupId)
    allUsers.forEach(element => element.forEach(d => {
        const idGroup = allGroups.find(a => a.id == d)
        teacherGroups.push(idGroup)
    }));
    res.render('teacher.group.ejs', {
        teacherGroups: teacherGroups
    })
}