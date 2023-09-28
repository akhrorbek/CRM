import Joi from "joi";

export const LoginValidation = Joi.object().keys({
    username: Joi.string().required().max(15),
    password: Joi.string().required().max(8)
})

export const StudentValidation = Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required().lowercase(),
    password: Joi.string().required().max(8),
    course: Joi.string().required(),
    group: Joi.string().required(),
    tel: Joi.number().optional(),
    email: Joi.optional()
})

export const TeacherValidation = Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required().lowercase(),
    password: Joi.string().required().max(8),
    field: Joi.string().required().lowercase(),
    groupId: Joi.number(),
    tel: Joi.number().optional(),
    email: Joi.optional()
})

export const CoursesValidation = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required().lowercase(),
    price: Joi.number().required()
})

export const GroupsValidation = Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required().lowercase(),
    days: Joi.string().required(),
    time: Joi.string().required(),
    teacher: Joi.string().required()
})