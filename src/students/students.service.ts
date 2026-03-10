import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentsRepo: Repository<Student>,
    ) { }

    // GET all students — ordered newest first
    findAll(): Promise<Student[]> {
        return this.studentsRepo.find({ order: { createdAt: 'DESC' } });
    }

    // GET one student by id
    async findOne(id: string): Promise<Student> {
        const student = await this.studentsRepo.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with id "${id}" not found.`);
        }
        return student;
    }

    // POST create a new student
    async create(dto: CreateStudentDto): Promise<Student> {
        // Check email uniqueness (PostgreSQL unique constraint also handles this)
        const existing = await this.studentsRepo.findOne({
            where: { email: dto.email.toLowerCase() },
        });
        if (existing) {
            throw new ConflictException(
                `A student with email "${dto.email}" already exists.`,
            );
        }

        const student = this.studentsRepo.create({
            ...dto,
            email: dto.email.toLowerCase(),
        });
        return this.studentsRepo.save(student);
    }

    // PUT update student fields
    async update(id: string, dto: UpdateStudentDto): Promise<Student> {
        const student = await this.findOne(id);

        // If email is being changed, check for conflicts
        if (dto.email && dto.email.toLowerCase() !== student.email) {
            const existing = await this.studentsRepo.findOne({
                where: { email: dto.email.toLowerCase() },
            });
            if (existing) {
                throw new ConflictException(
                    `A student with email "${dto.email}" already exists.`,
                );
            }
        }

        Object.assign(student, {
            ...dto,
            email: dto.email ? dto.email.toLowerCase() : student.email,
        });

        return this.studentsRepo.save(student);
    }

    // DELETE a student
    async remove(id: string): Promise<{ message: string }> {
        const student = await this.findOne(id);
        await this.studentsRepo.remove(student);
        return { message: `Student "${student.name}" deleted successfully.` };
    }
}
