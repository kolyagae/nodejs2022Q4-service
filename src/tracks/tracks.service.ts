import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly tracks: Repository<TrackEntity>,
  ) {}

  async getAll(): Promise<TrackEntity[]> {
    return await this.tracks.find();
  }

  async getOne(id: string): Promise<TrackEntity> {
    try {
      const track = await this.tracks.findOneByOrFail({ id });

      return track;
    } catch {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const uuid = uuidv4();
    const { name, duration } = createTrackDto;

    const newTrack = this.tracks.create({
      id: uuid,
      name,
      duration,
    });

    await this.tracks.save(newTrack);

    return newTrack;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.tracks.findOneBy({ id });

    if (!track) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    const updatedTrack = this.tracks.create({
      ...track,
      ...updateTrackDto,
    });

    await this.tracks.update(id, updatedTrack);

    return updatedTrack;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.tracks.findOneByOrFail({ id });
      await this.tracks.delete({ id });
    } catch {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
  }
}
