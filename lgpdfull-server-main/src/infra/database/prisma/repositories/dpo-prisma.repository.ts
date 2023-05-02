import { Injectable } from "@nestjs/common";
import { DpoRepository } from "src/app/interfaces/repositories/dpo-port.repository";
import { CreateDpoDto } from "src/infra/http/dtos/create-dpo.dto";
import { UpdateDpoDto } from "src/infra/http/dtos/update-dpo.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class DpoPrismaRepository implements DpoRepository{
    constructor(
        private readonly prisma: PrismaService
    ){ }

    public async create(createDpoDto: CreateDpoDto) {

        await this.updateActualDpo();

        const dpo = await this.prisma.dpo.create({
          data: createDpoDto
        });

        return dpo;
    }

    public async findAll(id: string){
        const dpos = await this.prisma.dpo.findMany({
            where: {
              userId: id,
              status: true
            },
            select: {
              id: true,
              socialName: true,
              naturalPerson: true,
              actual: true
            }
        });

        return dpos;
    }

    public async findOne(id: string){
        const dpo = await this.prisma.dpo.findFirst({
            where: {
              userId: id
            },
            select: {
              id: true,
              email: true,
              name: true,
              socialName: true
            }
        });

        return dpo;
    }

    public async findActual() {
        return this.prisma.dpo.findFirst({
            where: {
                actual: true,
            },
            select: {
              id: true,
              email: true,
              name: true,
              socialName: true
            }
        });
    }

    public async update(id: string, updateDpoDto: UpdateDpoDto){
        const dpo = await this.prisma.dpo.update({
            where: {
                id
            },
            data: updateDpoDto
        });

        return dpo;
    }

    public async remove(id: string){
        await this.prisma.dpo.update({
            where: {id},
            data: {
                status: false
            }
        })
    }

    public findById(id: string){
        return this.prisma.dpo.findUnique({where: {id}})
    }

    private async updateActualDpo() {

        await this.prisma.dpo.updateMany({
          where: {
            actual: true
          },
          data: {
            actual: false
          }
        })
    }


}
