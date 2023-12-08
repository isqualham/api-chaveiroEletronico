import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { Errors } from '../errors/Errors';
import { IStorageProvider } from '../providers/IStorageProvider';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { IUserDto } from '../interfacesDto/IUserDto';
import { IUserRepository } from '../repositories/IUserRepository';
import { IUserTokenRepository } from '../repositories/IUserTokenRepository';

dayjs.extend(utc);

@injectable()
class UserUseCase {
    constructor(
        @inject('UserRepository')
        private UserRepository: IUserRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        @inject('UserTokenRepository')
        private usersTokensRepository: IUserTokenRepository
    ) { };

    async create({ name, password, registration }: IUserDto): Promise<void> {

        const userAlreadyExists = await this.UserRepository.findByRegistration(registration);

        if (userAlreadyExists) {
            throw new Errors('usuário existente');
        }

        const passwordHash = await hash(password, 8);

        await this.UserRepository.create({
            name,
            password: passwordHash,
            registration
        });
    };

    async index(): Promise<IUserDto[]> {
        return await this.UserRepository.index();
    };

    async show(id: number): Promise<IUserDto> {
        return await this.UserRepository.show(id);
    };

    async update(id: number, name: string, registration: string, password?: string): Promise<void> {

        const userExists = await this.UserRepository.show(id);
        const registrationExists = await this.UserRepository.findByRegistration(registration);

        if (!userExists) throw new Errors('usuário já existe');
        if (registrationExists) throw new Errors('matricula já existe');

        const result = await this.UserRepository.update(id, name, registration);

    };

    async resetPassword(token: string, password: string): Promise<void> {

        const userToken = await this.usersTokensRepository.findByToken(token);

        if (!userToken) throw new Errors('token invalido!');

        if (dayjs(userToken.expiration_date).isBefore(dayjs())) {

            await this.usersTokensRepository.deleteById(userToken.id);
            throw new Errors('token expirado!');
        }

        const user = await this.UserRepository.show(userToken.user_id);

        user.password = await hash(password, 8);        

        const { id, name, registration } = user;

        await this.UserRepository.update(id, name, registration, user.password);

        await this.usersTokensRepository.deleteById(userToken.id);

    };
}
export { UserUseCase }