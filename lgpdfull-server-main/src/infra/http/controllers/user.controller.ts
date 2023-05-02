import { Controller, Get, Post, Body, Patch, Put, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IsPublic } from '../../../app/auth/decorators/is-public.decorator';
import { UserService } from 'src/app/use-cases/user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserPassDto } from '../dtos/update-user-pass.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @IsPublic()
  @Get(':email')
  savePass(@Param('email') email: string) {
    return this.userService.savePass(email);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('update-pass/:id')
  @HttpCode(HttpStatus.OK)
  updatePass(@Param('id') id: string, @Body() updateUserPassDto: UpdateUserPassDto) {
    return this.userService.updatePassword(id, updateUserPassDto);
  }

/*   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  } */
}
