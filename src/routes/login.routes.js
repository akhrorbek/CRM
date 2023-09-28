import { Router } from "express";
import { getLogin, postlogin } from "../controller/auth.controller.js";
import validate from "../middleware/validate.js";
import { LoginValidation } from "../validation/validation.js";
const router = Router()

export default router
    .get('/login', getLogin)
    .post('/login', validate(LoginValidation), postlogin)