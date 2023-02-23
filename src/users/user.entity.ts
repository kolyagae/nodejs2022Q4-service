import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  version: number;

  @Column({ type: 'int8' })
  @Transform(({ value }) => +value)
  createdAt: number;

  @Column({ type: 'int8' })
  @Transform(({ value }) => +value)
  updatedAt: number;

  @Exclude()
  @Column()
  password: string;
}
