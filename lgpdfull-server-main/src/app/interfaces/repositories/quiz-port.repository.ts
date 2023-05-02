import { QuizEntity } from "src/app/entities/quiz.entity";
import { CreateQuizDto } from "src/infra/http/dtos/create-quiz.dto";

export abstract class QuizRepository {
    abstract create(createQuizDto: CreateQuizDto): Promise<QuizEntity>;
    abstract findAll(id: string): Promise<{
        id: string; 
        result: string; 
        createdAt: Date;}[]>;
    abstract findOne(id: string): Promise<{
        id: string; 
        result: string; 
        answers: string; 
        createdAt: Date;} | null>;
    abstract findById(id: string): Promise<QuizEntity | null>;
    abstract remove(id: string): Promise<void>;
}