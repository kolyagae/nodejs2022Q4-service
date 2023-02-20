import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albums: Repository<AlbumEntity>,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    const albums = await this.albums.find();

    return albums;
  }

  async getOne(id: string): Promise<AlbumEntity> {
    try {
      const album = await this.albums.findOneByOrFail({ id });

      return album;
    } catch {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const uuid = uuidv4();
    const newAlbum = this.albums.create({
      id: uuid,
      ...createAlbumDto,
    });

    await this.albums.save(newAlbum);

    return newAlbum;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.albums.findOneBy({ id });

    if (!album) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    const updatedArtist = this.albums.create({
      ...album,
      ...updateAlbumDto,
    });

    await this.albums.update(id, updatedArtist);

    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.albums.findOneByOrFail({ id });
      await this.albums.delete(id);
    } catch {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
  }
}
