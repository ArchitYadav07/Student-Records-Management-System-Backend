import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.entity';

@Module({
    imports: [
        // Load .env file globally
        ConfigModule.forRoot({ isGlobal: true }),

        // PostgreSQL connection using env vars
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST', 'localhost'),
                port: config.get<number>('DB_PORT', 5432),
                username: config.get<string>('DB_USER', 'postgres'),
                password: config.get<string>('DB_PASSWORD', 'postgres'),
                database: config.get<string>('DB_NAME', 'students_db'),
                entities: [Student],
                synchronize: true, // Auto-creates/updates table schema in dev
                logging: false,
            }),
            inject: [ConfigService],
        }),

        StudentsModule,
    ],
})
export class AppModule { }
