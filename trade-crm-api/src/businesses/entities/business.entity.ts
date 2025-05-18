import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';

@Entity('businesses')
export class Business extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.business)
  users: User[];

  @OneToMany(() => Job, (job) => job.business)
  jobs: Job[];
}
