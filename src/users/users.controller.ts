import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  Delete,
  Param,
  Put,
  Post,
  Body,
  UseInterceptors,
  Header,
} from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @Header('content-type', 'application/json')
  findAll() {
    return this.usersService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @Header('content-type', 'application/json')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.usersService.getOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @Header('content-type', 'application/json')
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @Header('content-type', 'application/json')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
