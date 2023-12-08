import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserUseCase } from "../useCase/UserUseCase";

class UserController {

    async create(request: Request, response: Response): Promise<Response> {

        const { name, password, registration } = request.body;

        const User = container.resolve(UserUseCase);

        await User.create({ name, password, registration });

        return response.status(201).json("Usuário criado com sucesso");

    };

    async index(request: Request, response: Response): Promise<Response> {

        const User = container.resolve(UserUseCase);

        const result = await User.index();

        return response.status(200).json(result);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const User = container.resolve(UserUseCase);

        const result = await User.show(parseInt(id));

        return response.status(200).json(result);
    }

    async update(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const { name, registration } = request.body;

        const User = container.resolve(UserUseCase);

        const result = await User.update(parseInt(id),name, registration);

        return response.status(200).json(result);

    }

    async resetPassword(request: Request, response: Response): Promise<Response> {

        const { token, password } = request.body;

        const User = container.resolve(UserUseCase)

        await User.resetPassword(token, password);

        return response.status(204).json();

    };
}
export { UserController }