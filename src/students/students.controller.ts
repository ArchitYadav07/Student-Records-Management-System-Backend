import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    // GET /api/students
    @Get()
    findAll() {
        return this.studentsService.findAll();
    }

    // GET /api/students/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentsService.findOne(id);
    }

    // POST /api/students
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateStudentDto) {
        return this.studentsService.create(dto);
    }

    // PUT /api/students/:id
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
        return this.studentsService.update(id, dto);
    }

    // DELETE /api/students/:id
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string) {
        return this.studentsService.remove(id);
    }
}
