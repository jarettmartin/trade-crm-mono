import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Business } from '../../businesses/entities/business.entity';
import { CustomerAddress } from './customer-address.entity';
import { Job } from '../../jobs/entities/job.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToOne(() => Business, (business) => business.users)
  business: Business;

  @OneToMany(() => CustomerAddress, (ca) => ca.customer)
  addresses: CustomerAddress[];

  @OneToMany(() => Job, (job) => job.customer)
  jobs: Job[];
}
