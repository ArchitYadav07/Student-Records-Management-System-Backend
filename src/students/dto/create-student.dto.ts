import {
    IsString,
    IsEmail,
    IsInt,
    Min,
    Max,
    MinLength,
    MaxLength,
} from 'class-validator';

export class CreateStudentDto {
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 characters.' })
    @MaxLength(100, { message: 'Name must be under 100 characters.' })
    name: string;

    @IsEmail({}, { message: 'Please provide a valid email address.' })
    @MaxLength(150)
    email: string;

    @IsInt({ message: 'Age must be a whole number.' })
    @Min(1, { message: 'Age must be at least 1.' })
    @Max(120, { message: 'Age must be at most 120.' })
    age: number;
}
