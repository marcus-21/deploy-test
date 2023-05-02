import { SectorEntity } from "src/app/entities/sector.entity";
import { CreateSectorDto } from "src/infra/http/dtos/create-sector.dto";
import { UpdateSectorDto } from "src/infra/http/dtos/update-sector.dto";

export abstract class SectorRepository {
    abstract create(createSectorDto: CreateSectorDto): Promise<SectorEntity>;
    abstract findAll(id: string): Promise<SectorEntity[]>;
    abstract findOne(id: string): Promise<SectorEntity | null>;
    abstract findById(id: string): Promise<SectorEntity | null>;
    abstract update(id: string, updateSectorDto: UpdateSectorDto): Promise<SectorEntity>;
    abstract remove(id: string): Promise<void>;
}