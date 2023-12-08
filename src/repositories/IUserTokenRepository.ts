import { UsersTokens } from "@prisma/client";
import { IUserTokenDto } from "../interfacesDto/IUserTokenDto";

interface IUserTokenRepository {
    create({ user_id, token, expiration_date}: IUserTokenDto): Promise<UsersTokens>;
    findByUserIdAndRefreshToken(user_id: number, token: string): Promise<UsersTokens>;
    findByToken(token: string): Promise<UsersTokens>;
    deleteById(id: number): Promise<void>;
    deleteAllUserId(user_id: number): Promise<void>;
}

export { IUserTokenRepository }

