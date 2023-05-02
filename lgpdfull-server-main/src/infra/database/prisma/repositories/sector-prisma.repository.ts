import { Injectable } from "@nestjs/common";
import { SectorRepository } from "src/app/interfaces/repositories/sector-port.repository";
import { CreateSectorDto } from "src/infra/http/dtos/create-sector.dto";
import { UpdateSectorDto } from "src/infra/http/dtos/update-sector.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class SectorPrismaRepository implements SectorRepository{
    constructor(
        private readonly prisma: PrismaService
    ){}

    public async create(createSectorDto: CreateSectorDto){
        const sector = await this.prisma.sector.create({
            data:createSectorDto
        });

        return sector;
    }

    public async findAll(id: string){
        const sectorsList = await this.prisma.sector.findMany({where: {
            userId: id,
            status: true
        }});

        return sectorsList;
    }

    public async findOne(id: string){
        const sector = await this.prisma.sector.findUnique({
            where: {
                id
            }
        });

        return sector;
    }

    public async update(id: string, updateSectorDto: UpdateSectorDto){
        const sector = await this.prisma.sector.update({
            where: {
                id
            },
            data: updateSectorDto
        });

        return sector;
    }

    public async remove(id: string){
        await this.prisma.sector.update({
            where: {id},
            data: {
                status: false
            }
        })
    }

    public findById(id: string){
        return this.prisma.sector.findUnique({where: {id}})
    }
}
