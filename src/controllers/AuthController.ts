import { AuthUseCase } from "../useCase/AuthUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";


class AuthController {

    async create(request: Request, response: Response): Promise<Response> {
        const { password, registration } = request.body;

        const authUseCase = container.resolve(AuthUseCase)

        const authInf = await authUseCase.create({ password, registration });

        return response.status(200).json(authInf);
    }

}

export { AuthController }