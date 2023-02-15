import { Module } from '@nestjs/common';
import { DBModule } from './DB/DB.module';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    DBModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
