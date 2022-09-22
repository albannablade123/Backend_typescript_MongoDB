import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/user/user.validation";
import UserService from "./user.service";
import authenticated from "@/middleware/authenticated.middleware";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register)
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login)
    );
    this.router.get(`${this.path}`, authenticated, this.getUser);
  }
  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const token = await this.UserService.register(
        firstName,
        lastName,
        email,
        password,
        "user"
      );

      //Indicate that resource is succesfully created and return a token
      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const token = await this.UserService.login(email, password);

      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) : Response | void => {
    if (!req.user) {
        return next(new HttpException(404,'No logged in user'))
    }

    res.status(200).json({user: req.user});

  }
}

export default UserController;
