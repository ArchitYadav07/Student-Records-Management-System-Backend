import { IsString, IsEmail, IsInt, Min, Max, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Please provide a valid email address.' })
    @MaxLength(150)
    email?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(120)
    age?: number;
}
