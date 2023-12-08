import { IUserDto } from "../interfacesDto/IUserDto"

interface IUserRepository {
    create({ name, password, registration }: IUserDto): Promise<void>;
    show(id: number): Promise<IUserDto>;
    index(): Promise<IUserDto[]>;
    update(id: number, name: string, registration:string, password?: string): Promise<void>;
    findByRegistration(registration: string): Promise<IUserDto>;
}

export { IUserRepository }