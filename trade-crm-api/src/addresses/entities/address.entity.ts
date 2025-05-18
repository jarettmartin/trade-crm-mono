import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('addresses')
export class Address extends BaseEntity {
  @Column()
  streetNum: string;

  @Column()
  streetName: string;

  @Column({ nullable: true })
  unit: string;

  @Column()
  city: string;

  @Column()
  stateProvince: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;
}
