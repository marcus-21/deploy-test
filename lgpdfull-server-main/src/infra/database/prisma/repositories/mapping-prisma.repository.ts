import { Injectable } from "@nestjs/common";
import { MappingRepository } from "src/app/interfaces/repositories/mapping-port.repository";
import { CreateMappingDto } from "src/infra/http/dtos/create-mapping.dto";
import { UpdateMappingDto } from "src/infra/http/dtos/update-mapping.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class MappingPrismaRepository implements MappingRepository {
    constructor(
        private readonly prisma: PrismaService
    ){ }

    public async create(createMappingDto: CreateMappingDto) {
        const now = new Date();

        const data =  {
            ...createMappingDto,
            updatedAt: new Date(now.toLocaleString())
        }

        return await this.prisma.dataMapping.create({
            data: data
        });
    }

    public async findAll(id: string) {
        const dataMaps = await this.prisma.dataMapping.findMany({
          where: {
            userId: id,
            status: true
          }
        });

        return dataMaps;
    }

    public async findOne(id: string) {
        const dataMap = await this.prisma.dataMapping.findUnique({
          where:{
            id: id
          }
        });

        return dataMap;
    }

    public async update(id: string, updateMappingDto: UpdateMappingDto) {
      const now = new Date();

      const data = {
        ...updateMappingDto,
        updated_at: new Date(now.toLocaleString())
      };

      const updateDataMap = await this.prisma.dataMapping.update({
        where:{
          id
        },
        data
      });

      return updateDataMap;
    }

    public async remove(id: string) {
        await this.prisma.dataMapping.update({
            where: {id},
            data: {
                status: false
            }
        })
    }

    public findById(id: string){
        return this.prisma.dataMapping.findUnique({where: {id}})
    }
}
