import { Injectable } from '@nestjs/common';
import { Track } from 'src/tracks/tracks.interface';
import { UserEntity } from 'src/users/UserEntity';

@Injectable()
export class DBService {
  users: UserEntity[];
  tracks: Track[];

  constructor() {
    this.users = [];
    this.tracks = [];
  }
}
