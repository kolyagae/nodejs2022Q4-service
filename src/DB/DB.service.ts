import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/artist.model';
import { Track } from 'src/tracks/tracks.interface';
import { UserEntity } from 'src/users/UserEntity';

@Injectable()
export class DBService {
  users: UserEntity[];
  tracks: Track[];
  artists: Artist[];

  constructor() {
    this.users = [];
    this.tracks = [];
    this.artists = [];
  }
}
