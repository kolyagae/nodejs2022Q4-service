import { Album } from 'src/albums/album.model';
import { Artist } from 'src/artists/artist.model';
import { Track } from 'src/tracks/tracks.interface';

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor({ artists, albums, tracks }: IFavoritesResponse) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
