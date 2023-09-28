import { Router } from "express";
import { getCourses } from "../controller/courses.controller.js";

const route = Router()

export default route
    .get('/courses', getCourses)