import { Injectable } from '@nestjs/common';
import { UpdateMappingDto } from 'src/infra/http/dtos/update-mapping.dto';
import { CreateMappingDto } from '../../infra/http/dtos/create-mapping.dto';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { DpoRepository } from '../interfaces/repositories/dpo-port.repository';
import { MappingRepository } from '../interfaces/repositories/mapping-port.repository';
import { SectorRepository } from '../interfaces/repositories/sector-port.repository';
import { UserRepository } from '../interfaces/repositories/user-port.repository';

@Injectable()
export class MappingService {
  constructor(
    private readonly repository: MappingRepository,
    private readonly userRepository: UserRepository,
    private readonly sectorRepository: SectorRepository,
    private readonly dpoRepository: DpoRepository
  ){ }

  public async create(createMappingDto: CreateMappingDto) {
    return this.repository.create(createMappingDto);
  }

  public async findAll(id: string) {
    if(!(await this.userRepository.findById(id))){
      throw new NotFoundError('ID do usuário não encontrado!')
    }

    return await this.repository.findAll(id);
  }

  public async findOne(id: string) {
    if(!(await this.repository.findById(id))){
      throw new NotFoundError('ID do inventário não encontrado!')
    }

    const dataMap = await this.repository.findOne(id);
    const sector = await this.sectorRepository.findById(dataMap.sectorId);
    const dpo = await this.dpoRepository.findById(dataMap.dpoId);

    return {
      ...dataMap,
      sectorName: sector.tagName,
      dpoName: dpo.name
    }
  }

  public async update(id: string, updateMappingDto: UpdateMappingDto) {
    if(!(await this.repository.findById(id))){
      throw new NotFoundError('ID do inventário não encontrado!')
    }

    return await this.repository.update(id, updateMappingDto);
  }

  public async remove(id: string) {
    if(!(await this.repository.findById(id))){
      throw new NotFoundError('ID do inventário não encontrado!')
    }

    await this.repository.remove(id);

    return {
      message: "Inventário Excluído"
    };
  }
}
