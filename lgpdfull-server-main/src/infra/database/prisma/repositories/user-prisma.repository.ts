import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/app/interfaces/repositories/user-port.repository";
import { InsertUserDto } from "src/infra/http/dtos/insert-db-user.dto";
import { UpdateUserPassDto } from "src/infra/http/dtos/update-user-pass.dto";
import { UpdateUserDto } from "src/infra/http/dtos/update-user.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserPrismaRepository implements UserRepository{
    constructor(
        private readonly prisma: PrismaService
    ){}

    public async create(insertUserDto: InsertUserDto){
        const user = await this.prisma.user.create({
            data:insertUserDto
        });

        return user;
    }

    public async findAll(){
        const users = await this.prisma.user.findMany({
            select: {
              id: true,
              name: true,
              companyName: true,
            }
        });

        return users
    }

    public findById(id: string){
        return this.prisma.user.findUnique({where: {id}})
    }

    public findByEmail(email: string){
        return this.prisma.user.findUnique({where: {email}})
    }

    public async update(id: string, updateUserDto: UpdateUserDto){
        const user = await this.prisma.user.update({
            where: {id},
            data: updateUserDto,
            select: {
                id: true,
                name: true,
                companyName: true,
            }
        });

        return user;
    }

    public async updatePass(id: string, pass: string){
        await this.prisma.user.update({
            where: {id},
            data: {
                pass
            },
        });
    }

    public async updateSavePass(id: string, newPass: string){
        await this.prisma.user.update({
            where: {id},
            data:{
                pass: newPass
            }
        });
    }

    public async remove(id: string){
        await this.prisma.user.update({
                where: {id},
                data: {
                    status: false
                }
        })
    }



}
