import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.users.find();

    return users;
  }

  async getOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.users.findOneByOrFail({ id });

      return user;
    } catch {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const uuid = uuidv4();
    const startVersion = 1;
    const creationTimestamp = Date.now();
    const lastUpdateTimestamp = creationTimestamp;

    const newUser = this.users.create({
      id: uuid,
      ...createUserDto,
      version: startVersion,
      createdAt: creationTimestamp,
      updatedAt: lastUpdateTimestamp,
    });

    await this.users.save(newUser);

    return newUser;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.users.findOneBy({ id });

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    const newTimestamp = Date.now();
    const { oldPassword, newPassword } = updatePasswordDto;
    const { version, password } = user;
    const newVersion = version + 1;

    if (oldPassword !== password) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    const updatedUser = this.users.create({
      ...user,
      version: newVersion,
      password: newPassword,
      updatedAt: newTimestamp,
    });

    await this.users.update(id, updatedUser);

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.users.findOneByOrFail({ id });
      await this.users.delete({ id });
    } catch {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
  }
}
