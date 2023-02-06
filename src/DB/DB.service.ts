import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/album.model';
import { Artist } from 'src/artists/artist.model';
import { IFavorites } from 'src/favorites/favorites.model';
import { Track } from 'src/tracks/tracks.interface';
import { UserEntity } from 'src/users/UserEntity';

@Injectable()
export class DBService {
  users: UserEntity[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favorites: IFavorites;

  constructor() {
    this.users = [];
    this.tracks = [];
    this.artists = [];
    this.albums = [];
    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }
}
