import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Business } from '../../businesses/entities/business.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Business, (business) => business.users)
  business: Business;
}
