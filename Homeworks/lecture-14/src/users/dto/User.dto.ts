import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'username123', description: 'Register user name' })
    @IsNotEmpty({message: 'Username cannot be empty'})
    @MinLength(3, { message: 'Username should be at least 3 characters long' })
    username!: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsNotEmpty({message: 'Password cannot be empty'})
    @MinLength(4, { message: 'The password must be at least 4 characters long' })
    password!: string;
}