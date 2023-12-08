import { NextFunction, Request, Response } from "express";
import { Errors } from "../errors/Errors";
import { UserRepository } from "../repositories/prisma/UserRepository";


export async function AdminMiddleware
    (request: Request, response: Response, next: NextFunction) {

    const { id } = request.user;

    const User= new UserRepository();
    const user = await User.show(id);

    if (!user.admin)
        throw new Errors("Usuário não é administrador");

    return next();

}