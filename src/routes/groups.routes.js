import { Router } from "express";
import { getGroups } from "../controller/groups.controller.js";

const route = Router()

export default route
    .get('/groups', getGroups)