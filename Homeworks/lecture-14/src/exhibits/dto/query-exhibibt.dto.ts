import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class QueryExhibitDto {
    @ApiProperty({
        description: 'Page number',
        required: false,
        default: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number

    @ApiProperty({
        description: 'Number of records',
        required: false,
        default: 10
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number
}