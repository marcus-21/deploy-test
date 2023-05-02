import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../infra/http/dtos/create-user.dto';
import { InsertUserDto } from 'src/infra/http/dtos/insert-db-user.dto';
import { ConflictError } from '../common/errors/types/ConflictError';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { UpdateUserPassDto } from 'src/infra/http/dtos/update-user-pass.dto';
import { UpdateUserDto } from 'src/infra/http/dtos/update-user.dto';
import { UserRepository } from '../interfaces/repositories/user-port.repository';
import { EncryptService } from '../interfaces/encrypt-port.service';
import { GeneratePassService } from '../interfaces/generate-pass-port.service';
import { MailerService } from '../interfaces/mailer-port.service';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly generatePassService: GeneratePassService,
    private readonly nodeMailerService: MailerService,
    private readonly encryptService: EncryptService,
  ) { }

  public async create(createUserDto: CreateUserDto)  {
    if(await this.repository.findByEmail(createUserDto.email)){
      throw new ConflictError("Este e-mail já foi registrado!");
    }

    const pass = this.generatePassService.generate();

    const insertUserDto: InsertUserDto = {
      ...createUserDto,
      pass: await this.encryptService.encryptPassword(pass)
    };

    const user = await this.repository.create(insertUserDto);

    await this.nodeMailerService.sendPasswordEmail(user.email, pass);

    return user;
  }

  public findAll() {
    return this.repository.findAll();
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    if(!await this.repository.findById(id)){
      throw new NotFoundError("ID não encontrado para a atualização!");
    }

    const user = await this.repository.update(id, updateUserDto);

    return user;
  }

  public async updatePassword(id: string, updateUserPassDto: UpdateUserPassDto) {
    const user = await this.repository.findById(id);

    if(!user){
      throw new NotFoundError("ID não encontrado para a atualização!");
    }

    const isPassValid = await this.encryptService.comparePasswords(updateUserPassDto.actualPass, user.pass);

    if(!isPassValid){
      throw new ConflictError("A senha atual está incorreta.");
    }

    const pass = await this.encryptService.encryptPassword(updateUserPassDto.newPass);

    await this.repository.updatePass(id, pass);

    return {
      message: "Senha alterada!",
    };
  }

  public async remove(id: string) {
    if(await this.repository.findById(id)){
      throw new NotFoundError("ID não encontrado para a atualização!");
    }

    await this.repository.remove(id);

    return {
      message: "Usuário desativado!"
    }
  }

  public async savePass(email: string) {
    const user = await this.repository.findByEmail(email);

    if(!user){
      throw new ConflictError("E-mail não encontrado!");
    }

    const newPass = this.generatePassService.generate();

    await this.repository.updateSavePass(user.id, await this.encryptService.encryptPassword(newPass));

    await this.nodeMailerService.sendNewPasswordEmail(email, newPass);

    return {
      message: "Nova senha enviada!"
    }
  }
}
