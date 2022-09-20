import Joi from "joi";

const register = Joi.object({
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    emailName: Joi.string().email().required(),
    password: Joi.string().min(6).required()

});

const login = Joi.object({
    emailName: Joi.string().email().required(),
    password: Joi.string().required()
})

export default {register,login}