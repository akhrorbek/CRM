import { Router } from "express";
import { deleteCourses, deleteGroup, deleteStudents, getAdmin, getCourses, getGroups, getStudents, getTeachers, postCourses, postGroups, postStudents, postTeachers } from "../controller/admin.controller.js";
import validate from "../middleware/validate.js";
import verifyRole from "../middleware/verifyRole.js";
import { CoursesValidation, GroupsValidation, StudentValidation, TeacherValidation } from "../validation/validation.js";

const route = Router()

export default route
    .get('/admin', verifyRole('admin'), getAdmin)
    .get('/admin/student', verifyRole('admin'), getStudents)
    .post('/admin/student', validate(StudentValidation), postStudents)
    .delete('/admin/student/:id', deleteStudents)
    .get('/admin/teacher', verifyRole('admin'), getTeachers)
    .post('/admin/teacher',  validate(TeacherValidation), postTeachers)
    .get('/admin/group', verifyRole('admin'), getGroups)
    .post('/admin/group', validate(GroupsValidation), postGroups)
    .delete('/admin/group/:id', deleteGroup)
    .get('/admin/course', verifyRole('admin'), getCourses)
    .post('/admin/course', validate(CoursesValidation), postCourses)
    .delete('/admin/course/:id', deleteCourses)