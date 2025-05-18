import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Job } from '../../jobs/entities/job.entity';

@Entity('appointments')
export class Appointment extends BaseEntity {
  @Column()
  scheduledAt: Date;

  @ManyToOne(() => Job, (job) => job.appointments)
  job: Job;
}
