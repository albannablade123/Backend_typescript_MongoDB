import {Request,Response, NextFunction, RequestHandler, response } from "express";
import Joi from "joi";
import { join } from "path";

// Go through all data that is passed and validate it with the schema, abortearly make it that on failure it will immidiately abort.
// allowUnknown allow value that is not part of the schema
function validationMiddleware(schema: Joi.Schema): RequestHandler{
    return async(
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,

        };


        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions,

            );

            req.body = value;
            next();

        } catch (e:any){
            const errors:string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
           
            res.status(400).send({ errors : errors});
        }
    }
}

export default validationMiddleware;