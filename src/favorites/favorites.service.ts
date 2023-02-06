import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DBService } from 'src/DB/DB.service';
import { FavoritesResponse } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(private db: DBService) {}

  getAll(): FavoritesResponse {
    const tracks = this.db.tracks.filter((track) =>
      this.db.favorites.tracks.includes(track.id),
    );
    const albums = this.db.albums.filter((album) =>
      this.db.favorites.albums.includes(album.id),
    );
    const artists = this.db.artists.filter((artist) =>
      this.db.favorites.artists.includes(artist.id),
    );

    const response = new FavoritesResponse({
      artists,
      albums,
      tracks,
    });

    return response;
  }

  addTrack(id: string): Record<string, string> {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.tracks.push(id);

    return { message: 'Track added to favorites' };
  }

  removeTrack(id: string): void {
    const index = this.db.favorites.tracks.findIndex((track) => track === id);

    if (index === -1) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    this.db.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string): Record<string, string> {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.albums.push(id);

    return { message: 'Album added to favorites' };
  }

  removeAlbum(id: string): void {
    const index = this.db.favorites.albums.findIndex((album) => album === id);

    if (index === -1) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    this.db.favorites.albums.splice(index, 1);
  }

  addArtist(id: string): Record<string, string> {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.artists.push(id);

    return { message: 'Artist added to favorites' };
  }

  removeArtist(id: string): void {
    const index = this.db.favorites.artists.findIndex(
      (artist) => artist === id,
    );

    if (index === -1) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    this.db.favorites.artists.splice(index, 1);
  }
}
