import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from '../../infra/http/dtos/create-quiz.dto';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { UserRepository } from '../interfaces/repositories/user-port.repository';
import { QuizRepository } from '../interfaces/repositories/quiz-port.repository';

@Injectable()
export class QuizService {
  constructor(
    private readonly repository: QuizRepository,
    private readonly userRepository: UserRepository
  ){}

  public async create(createQuizDto: CreateQuizDto) {
    return this.repository.create(createQuizDto);
  }

  public async findAll(id:string) {
    if(!(await this.userRepository.findById(id))){
      throw new NotFoundError('ID do usuário não encontrado!')
    }
    return await this.repository.findAll(id);
  }

  public async findOne(id: string) {
    if(!(await this.repository.findById(id))){
      throw new NotFoundError('ID do quiz não encontrado!')
    }
    return this.repository.findOne(id);
  }

  public async remove(id: string) {
    if(!(await this.repository.findById(id))){
      throw new NotFoundError('ID do quiz não encontrado!')
    }
    await this.repository.remove(id);

    return {
        message: "Quiz Excluído"
      };
  }
}
