interface IUserDto {
    id?: number;
    name: string
    password?: string;
    registration: string;
    admin?: Boolean;
}

export { IUserDto };