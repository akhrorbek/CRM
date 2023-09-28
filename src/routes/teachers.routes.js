import { Router } from "express";
import { getGroup, getTeacher } from "../controller/teacher.controller.js";
import verifyRole from "../middleware/verifyRole.js";

const route = Router()

export default route
    .get('/teacher', verifyRole('teacher'), getTeacher)
    .get('/teacher/group', verifyRole('teacher'), getGroup)