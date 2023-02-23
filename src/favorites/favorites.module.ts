import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/album.entity';
import { ArtistEntity } from 'src/artists/artist.entity';
import { TrackEntity } from 'src/tracks/track.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesEntity } from './favorites.entity';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesEntity,
      AlbumEntity,
      TrackEntity,
      ArtistEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
