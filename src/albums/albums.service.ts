import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'src/DB/DB.service';
import { Album } from './album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private db: DBService) {}

  getAll(): Album[] {
    return this.db.albums;
  }

  getOne(id: string): Album {
    const artist = this.db.albums.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const uuid = uuidv4();
    const { name, year, artistId } = createAlbumDto;

    const newAlbum = new Album({
      id: uuid,
      name,
      year,
      artistId,
    });

    this.db.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const index = this.db.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    const artist = this.db.albums[index];

    const updatedArtist = new Album({
      ...artist,
      ...updateAlbumDto,
    });

    this.db.albums.splice(index, 1, updatedArtist);

    return updatedArtist;
  }

  remove(id: string): void {
    const index = this.db.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    const indexFavAlbum = this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (indexFavAlbum !== -1) {
      this.db.favorites.albums.splice(indexFavAlbum, 1);
    }

    this.db.albums.splice(index, 1);
  }
}
