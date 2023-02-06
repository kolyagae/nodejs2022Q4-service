import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'src/DB/DB.service';
import { Artist } from './artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private db: DBService) {}

  getAll(): Artist[] {
    return this.db.artists;
  }

  getOne(id: string): Artist {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const uuid = uuidv4();
    const { name, grammy } = createArtistDto;

    const newArtist = new Artist({
      id: uuid,
      name,
      grammy,
    });

    this.db.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const index = this.db.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    const artist = this.db.artists[index];

    const updatedArtist = new Artist({
      ...artist,
      ...updateArtistDto,
    });

    this.db.artists.splice(index, 1, updatedArtist);

    return updatedArtist;
  }

  remove(id: string): void {
    const index = this.db.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    const indexFavArtist = this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (indexFavArtist !== -1) {
      this.db.favorites.artists.splice(indexFavArtist, 1);
    }

    this.db.artists.splice(index, 1);
  }
}
