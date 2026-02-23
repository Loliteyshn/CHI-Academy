import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class LoginDto {
    @ApiProperty({ example: 'test', description: 'Username' })
    @IsNotEmpty()
    username!: string

    @ApiProperty({ example: 'test', description: 'Password' })
    @IsNotEmpty()
    password!: string
}