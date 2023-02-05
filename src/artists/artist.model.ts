type TArtist = {
  id: string;
  name: string;
  grammy: boolean;
};

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor({ id, name, grammy }: TArtist) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
