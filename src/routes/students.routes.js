import { Router } from "express";
import { getStudent } from "../controller/student.controller.js";
import verifyRole from "../middleware/verifyRole.js";

const route = Router()

export default route
        .get('/student', verifyRole('student'), getStudent)