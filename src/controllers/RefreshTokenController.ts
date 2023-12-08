import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "../useCase/RefreshTokenUseCase";

class RefreshTokenController {

    async create(request: Request, response: Response): Promise<Response> {
        const token = request.body.token ||
            request.header["x-access-token"] ||
            request.query.token ||
            request.headers.authorization;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refresh_token = await refreshTokenUseCase.create(token);

        return response.status(201).json(refresh_token);
    };
}

export { RefreshTokenController }