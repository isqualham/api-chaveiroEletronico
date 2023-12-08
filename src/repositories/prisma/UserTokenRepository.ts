import { PrismaClient, UsersTokens } from "@prisma/client";
import { IUserTokenRepository } from "../IUserTokenRepository";
import { IUserTokenDto } from "../../interfacesDto/IUserTokenDto";

const prisma = new PrismaClient();

class UserTokenRepository implements IUserTokenRepository {
    async create({ token, expiration_date, user_id }: IUserTokenDto): Promise<UsersTokens> {

        const userToken = await prisma.usersTokens.create({
            data: {
                token,
                expiration_date,
                user_id
            }
        });

        return userToken;
    };

    async findByToken(token: string): Promise<UsersTokens> {

        return await prisma.usersTokens.findFirst({
            where: {
                token: token,
            }
        });
    }

    async findByUserIdAndRefreshToken(user_id: number, token: string): Promise<UsersTokens> {
        const userTokens = await prisma.usersTokens.findFirst({
            where: {
                user_id,
                token
            }
        });

        return userTokens;
    }

    async deleteById(id: number): Promise<void> {
        await prisma.usersTokens.delete({
            where: {
                id
            }
        });
    }

    async deleteAllUserId(user_id: number): Promise<void> {
        await prisma.usersTokens.deleteMany({
            where: {
                user_id
            }
        });
    }



}

export { UserTokenRepository }