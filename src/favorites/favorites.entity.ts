import { AlbumEntity } from 'src/albums/album.entity';
import { ArtistEntity } from 'src/artists/artist.entity';
import { TrackEntity } from 'src/tracks/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  tracks: TrackEntity[];
}
