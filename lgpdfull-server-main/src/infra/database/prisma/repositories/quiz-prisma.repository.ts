import { Injectable } from "@nestjs/common";
import { QuizRepository } from "src/app/interfaces/repositories/quiz-port.repository";
import { CreateQuizDto } from "src/infra/http/dtos/create-quiz.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class QuizPrismaRepository implements QuizRepository{
    constructor(
        private readonly prisma: PrismaService
    ){ }

    public async create(createQuizDto: CreateQuizDto){
        const quiz = await this.prisma.quiz.create({
            data: createQuizDto
        });

        return quiz;
    }

    public async findAll(id: string){
        const quizes = await this.prisma.quiz.findMany({
            where: {
                userId: id,
                status: true
            },
            select:{
              id: true,
              result: true,
              createdAt: true
            }
        })

        return quizes;
    }

    public async findOne(id: string){
        const quiz = await this.prisma.quiz.findUnique({
            where:{
              id
            },
            select:{
              id: true,
              answers: true,
              result: true,
              createdAt: true
            }
        });

        return quiz;
    }

    public async remove(id: string) {
        await this.prisma.quiz.update({
            where: {id},
            data: {
                status: false
            }
        })
    }

    public findById(id: string){
      return this.prisma.quiz.findUnique({where: {id}})
    }
}
