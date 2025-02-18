import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diarista {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  endereco: string;
  @Column({ nullable: false })
  idade: number;
}
