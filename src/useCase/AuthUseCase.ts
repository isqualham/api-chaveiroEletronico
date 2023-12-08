import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { Errors } from "../errors/Errors";
import { IUserTokenRepository } from "../repositories/IUserTokenRepository";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { IUserRepository } from "../repositories/IUserRepository";

dayjs.extend(utc);

interface IRequestDto {
    registration: string;
    password: string;
}

interface IResponseDto {
    token: string;
}

@injectable()
class AuthUseCase {

    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepository,
        @inject("UserTokenRepository")
        private usersTokensRepository: IUserTokenRepository
    ) { }

    async create({ registration, password }: IRequestDto): Promise<IResponseDto> {
        const user = await this.usersRepository.findByRegistration(registration);

        if (!user) throw new Errors("matricula não existe");

        const passwordMatch = await compare(password, user.password);
        const {name} = user;

        if (!passwordMatch) throw new Errors("password não existe");

        await this.usersTokensRepository.deleteAllUserId(user.id);

        const token = sign({name, registration }, process.env.SECRET_TOKEN, {
            subject: user.id.toString(),
            expiresIn: process.env.EXPIRES_IN_TOKEN
        });

        await this.usersTokensRepository.create({
            user_id: user.id,
            expiration_date: dayjs().add(Number.parseInt(process.env.EXPIRES_TOKEN), "days").toDate(),
            token,
        });

        return {
            token
        };

    }
}

export { AuthUseCase }