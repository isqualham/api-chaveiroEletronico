import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { Errors } from "../errors/Errors";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { IUserTokenRepository } from "../repositories/IUserTokenRepository";


dayjs.extend(utc);

interface IPayload {
    sub: string;
    email: string;
    name: string;
    cpf?: string; 
    ddd?: string; 
    cell_phone?: string; 
    birth_date?: string; 
    avatar?: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokenRepository")
        private usersTokensRepository: IUserTokenRepository
    ) { }

    async create(token: string): Promise<string> {
        const { sub, name, email, cpf, ddd, cell_phone, birth_date, avatar } = verify(token, process.env.SECRET_TOKEN) as IPayload;
        const user_id = Number.parseInt(sub);
        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!userToken) throw new Errors("Token não existe!");

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({name, email, cpf, ddd, cell_phone, birth_date, avatar }, process.env.SECRET_TOKEN, {
            subject: sub,
            expiresIn: process.env.EXPIRES_IN_TOKEN
        });

        await this.usersTokensRepository.create({
            user_id: user_id,
            expiration_date: dayjs().add(Number.parseInt(process.env.EXPIRES_TOKEN), "days").toDate(),
            token,
        });

        return refresh_token;
    }
}
export { RefreshTokenUseCase }