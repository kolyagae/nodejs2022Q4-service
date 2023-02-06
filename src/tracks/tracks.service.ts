import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'src/DB/DB.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './tracks.interface';

@Injectable()
export class TracksService {
  constructor(private db: DBService) {}

  getAll(): Track[] {
    return this.db.tracks;
  }

  getOne(id: string): Track {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const uuid = uuidv4();
    const { name, artistId = null, albumId = null, duration } = createTrackDto;

    const newTrack = {
      id: uuid,
      name,
      artistId,
      albumId,
      duration,
    };

    this.db.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const index = this.db.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    const track = this.db.tracks[index];

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    this.db.tracks.splice(index, 1, updatedTrack);

    return updatedTrack;
  }

  remove(id: string): void {
    const index = this.db.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    const indexFavTrack = this.db.favorites.artists.findIndex(
      (trackId) => trackId === id,
    );

    if (indexFavTrack !== -1) {
      this.db.favorites.tracks.splice(indexFavTrack, 1);
    }

    this.db.tracks.splice(index, 1);
  }
}
