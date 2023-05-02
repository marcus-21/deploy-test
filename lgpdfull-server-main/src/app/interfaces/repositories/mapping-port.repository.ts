import { MappingEntity } from "src/app/entities/mapping.entity";
import { CreateMappingDto } from "src/infra/http/dtos/create-mapping.dto";
import { UpdateMappingDto } from "src/infra/http/dtos/update-mapping.dto";

export abstract class MappingRepository {
    abstract create(createMappingDto: CreateMappingDto): Promise<MappingEntity>;
    abstract findAll(id: string): Promise<MappingEntity[]>;
    abstract findOne(id: string): Promise<MappingEntity | null>;
    abstract findById(id: string): Promise<MappingEntity | null>;
    abstract update(id: string, updateMappingDto: UpdateMappingDto): Promise<MappingEntity>;
    abstract remove(id: string): Promise<void>;
}