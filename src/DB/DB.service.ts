import { Injectable } from '@nestjs/common';
import { UserEntity } from './UserEntity';

@Injectable()
export class DBService {
  users: UserEntity[];
  constructor() {
    this.users = [];
  }
}
