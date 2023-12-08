import { PrismaClient } from "@prisma/client";
import { IUserDto } from "../../interfacesDto/IUserDto";
import { IUserRepository } from "../IUserRepository";

const prisma = new PrismaClient();

class UserRepository implements IUserRepository {

    async create({ name, password, registration }: IUserDto): Promise<void> {
        const result = await prisma.users.create({
            data: {
                name,
                password,
                registration
            }
        });
    };

    async show(id: number): Promise<IUserDto> {
        const result = await prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                registration: true,
                admin: true,
                created_At: true
            }
        });

        return result;
    };

    async index(): Promise<IUserDto[]> {
        return await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                registration: true,
                created_At: true
            }
        });
    };

    async update(id: number, name: string, registration: string, password?: string): Promise<void> {
        await prisma.users.update({
            where: {
                id: id
            },
            data: {
                name: name,
                registration: registration,
                password: password
            }
        });
    };

    async findByRegistration(registration: string): Promise<IUserDto> {
        let exists: boolean;

        if (registration) exists = true;

        if (exists) {
            const result = await prisma.users.findUnique({
                where: {
                    registration: registration,
                },
                select: {
                    id: true,
                    name: true,
                    registration: true,
                    password: true,
                    admin: true,
                    created_At: true
                }
            });

            return result;
        }

        return null;

    };
}
export { UserRepository }