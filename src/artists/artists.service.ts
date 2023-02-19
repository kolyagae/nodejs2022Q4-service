import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artists: Repository<ArtistEntity>,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    const artists = await this.artists.find();

    return artists;
  }

  async getOne(id: string): Promise<ArtistEntity> {
    try {
      const artist = await this.artists.findOneByOrFail({ id });

      return artist;
    } catch {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const uuid = uuidv4();
    // const { name, grammy } = createArtistDto;

    const newArtist = this.artists.create({
      id: uuid,
      ...createArtistDto,
    });

    await this.artists.save(newArtist);

    return newArtist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.artists.findOneBy({ id });

    if (!artist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    const updatedArtist = this.artists.create({
      ...artist,
      ...updateArtistDto,
    });

    await this.artists.update(id, updatedArtist);

    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.artists.findOneByOrFail({ id });
      await this.artists.delete(id);
    } catch {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    // this.tracks.forEach((track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    // });

    // const indexFavArtist = this.favorites.artists.findIndex(
    //   (artistId) => artistId === id,
    // );

    // if (indexFavArtist !== -1) {
    //   this.favorites.artists.splice(indexFavArtist, 1);
    // }

    // this.artists.splice(index, 1);
  }
}
