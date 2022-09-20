import {Router, Request, Response, NextFunction} from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/user/user.validation";
import UserService from "./user.service";
import authenticated from "@/middleware/authenticated.middleware";

class UserController implements Controller{
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(){
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register,
                this.register)
        )

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login,this.login)
        )
    }
}