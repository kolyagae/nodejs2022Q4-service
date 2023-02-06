type TAlbum = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor({ id, name, year, artistId }: TAlbum) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
