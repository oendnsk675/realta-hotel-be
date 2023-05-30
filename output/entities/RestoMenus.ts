import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderMenuDetail } from './OrderMenuDetail';
import { RestoMenuPhotos } from './RestoMenuPhotos';

// @Index('pk_resto_menus', ['remeId'], { unique: true })
@Entity('resto_menus', { schema: 'resto' })
export class RestoMenus {
  @Column('integer', { name: 'reme_faci_id', nullable: true })
  remeFaciId: number | null;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'reme_id' })
  remeId: number;

  @Column('character varying', {
    name: 'reme_name',
    nullable: true,
    length: 55,
  })
  remeName: string | null;

  @Column('character varying', {
    name: 'reme_description',
    nullable: true,
    length: 255,
  })
  remeDescription: string | null;

  @Column('money', { name: 'reme_price', nullable: true })
  remePrice: string | null;

  @Column('character varying', {
    name: 'reme_status',
    nullable: true,
    length: 15,
  })
  remeStatus: string | null;

  @Column('character varying', {
    name: 'reme_type',
    nullable: true,
  })
  remeType: string | null;

  @Column('timestamp without time zone', {
    name: 'reme_modified_date',
    nullable: true,
  })
  remeModifiedDate: Date | null;

  @OneToMany(
    () => OrderMenuDetail,
    (orderMenuDetail) => orderMenuDetail.omdeReme,
  )
  orderMenuDetails: OrderMenuDetail[];

  @OneToMany(
    () => RestoMenuPhotos,
    (restoMenuPhotos) => restoMenuPhotos.rempReme,
  )
  restoMenuPhotos: RestoMenuPhotos[];
}
