import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './DB/DB.module';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, DBModule, TracksModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
