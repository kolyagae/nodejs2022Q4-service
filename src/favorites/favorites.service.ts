import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/album.entity';
import { ArtistEntity } from 'src/artists/artist.entity';
import { TrackEntity } from 'src/tracks/track.entity';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favorites: Repository<FavoritesEntity>,
    @InjectRepository(TrackEntity)
    private readonly tracks: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albums: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artists: Repository<ArtistEntity>,
  ) {}

  async getAll(): Promise<FavoritesEntity> {
    const [favorites] = await this.favorites.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (!favorites) {
      await this.favorites.save(
        // this.favorites.create({
        //   artists: [],
        //   albums: [],
        //   tracks: [],
        // }),
        new FavoritesEntity(),
      );

      return this.getAll();
    }

    return favorites;
  }

  async addTrack(id: string) {
    try {
      const track = await this.tracks.findOneByOrFail({ id });
      const favorites = await this.getAll();
      favorites.tracks.push(track);
      await this.favorites.save(favorites);

      return { message: 'Track added to favorites' };
    } catch {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeTrack(id: string): Promise<void> {
    try {
      await this.tracks.findOneByOrFail({ id });
      const favorites = await this.getAll();
      const index = favorites.tracks.findIndex((track) => track.id === id);

      if (index === -1) {
        throw new Error();
      }

      favorites.tracks.splice(index, 1);

      await this.favorites.save(favorites);
    } catch {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
  }

  async addAlbum(id: string) {
    try {
      const album = await this.albums.findOneByOrFail({ id });
      const favorites = await this.getAll();
      favorites.albums.push(album);
      await this.favorites.save(favorites);

      return { message: 'Album added to favorites' };
    } catch {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeAlbum(id: string): Promise<void> {
    try {
      await this.albums.findOneByOrFail({ id });
      const favorites = await this.getAll();
      const index = favorites.albums.findIndex((album) => album.id === id);

      if (index === -1) {
        throw new Error();
      }

      favorites.albums.splice(index, 1);

      await this.favorites.save(favorites);
    } catch {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
  }

  async addArtist(id: string) {
    try {
      const artist = await this.artists.findOneByOrFail({ id });
      const favorites = await this.getAll();
      favorites.artists.push(artist);
      await this.favorites.save(favorites);

      return { message: 'Artist added to favorites' };
    } catch {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeArtist(id: string): Promise<void> {
    try {
      await this.artists.findOneByOrFail({ id });
      const favorites = await this.getAll();
      const index = favorites.artists.findIndex((artist) => artist.id === id);

      if (index === -1) {
        throw new Error();
      }

      favorites.artists.splice(index, 1);

      await this.favorites.save(favorites);
    } catch {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
  }
}
