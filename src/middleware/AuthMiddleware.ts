import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Errors } from "../errors/Errors";
import { UserRepository } from "../repositories/prisma/UserRepository";


interface IPayload {
    sub: string;
}

export async function AuthMiddleware
    (request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Errors("token obrigatório", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, process.env.SECRET_TOKEN) as IPayload;

        const User= new UserRepository();

        const user = User.show(Number.parseInt(sub))

        if (!user) {
            throw new Errors("user does not exist", 401);
        }

        request.user = {
            id: Number.parseInt(sub)
        }

        next();
    } catch {
        throw new Errors("token invalid", 401);
    }

}