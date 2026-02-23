import { IsNotEmpty, IsString } from "class-validator";

export class ExhibitDto {
    @IsString()
    @IsNotEmpty()
    description!: string;
}