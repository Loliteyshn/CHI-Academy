import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUser {
    @IsEmail()
    email!: string;

    @IsString({ message: 'Username should be string' })
    @MinLength(3, { message: 'Username should be longer than 3' })
    user!: string
}