import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'src/DB/DB.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from 'src/users/UserEntity';

@Injectable()
export class UsersService {
  constructor(private db: DBService) {}

  getAll(): UserEntity[] {
    return this.db.users;
  }

  getOne(id: string): UserEntity {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User is not founded', HttpStatus.NOT_FOUND);
    }

    return new UserEntity(user);
  }

  create(createUserDto: CreateUserDto): UserEntity {
    const uuid = uuidv4();
    const startVersion = 1;
    const creationTimestamp = Date.now();
    const lastUpdateTimestamp = creationTimestamp;

    const newUser = new UserEntity({
      id: uuid,
      ...createUserDto,
      version: startVersion,
      createdAt: creationTimestamp,
      updatedAt: lastUpdateTimestamp,
    });

    this.db.users.push(newUser);

    return newUser;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): UserEntity {
    const index = this.db.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    const user = this.db.users[index];
    const newTimestamp = Date.now();
    const { oldPassword, newPassword } = updatePasswordDto;
    const { version, password } = user;
    const newVersion = version + 1;

    if (oldPassword !== password) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    const updatedUser = new UserEntity({
      ...user,
      version: newVersion,
      password: newPassword,
      updatedAt: newTimestamp,
    });

    this.db.users.splice(index, 1, updatedUser);

    return updatedUser;
  }

  remove(id: string): void {
    const index = this.db.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    this.db.users.splice(index, 1);
  }
}
