import { IsString } from "class-validator";

export class ExhibitDto {
    @IsString()
    description!: string;
}