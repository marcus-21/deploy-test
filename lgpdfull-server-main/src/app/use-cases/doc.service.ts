import { Injectable } from "@nestjs/common";
import { DpoRepository } from "../interfaces/repositories/dpo-port.repository";
import { MappingRepository } from "../interfaces/repositories/mapping-port.repository";
import { SectorRepository } from "../interfaces/repositories/sector-port.repository";

@Injectable()
export class DocService {

    constructor(
        private readonly mappingRepository: MappingRepository,
        private readonly dpoRepository: DpoRepository,
        private readonly sectorRepository: SectorRepository,
    ){}

    public async getDataMap(id: string){

        let data = await this.mappingRepository.findById(id);
        const dpoName = await this.dpoRepository.findById(data.dpoId);
        const sectorName = await this.sectorRepository.findById(data.dpoId);

        data.dpoId = undefined;
        data.userId = undefined;
        data.id = undefined;
        data.sectorId = undefined;
        data.status = undefined;

        return {
            ...data,
            dpoName: dpoName.name,
            sectorName: sectorName.tagName
        }
    }

}
