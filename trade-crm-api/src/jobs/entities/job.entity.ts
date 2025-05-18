import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Business } from '../../businesses/entities/business.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { LabourItem } from './labour-item.entity';
import { MaterialItem } from './material-item.entity';

export enum JobStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  IN_PROGRESS = 'in_progress',
  INVOICED = 'invoiced',
  PAID = 'paid',
}

@Entity('jobs')
export class Job extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.PENDING,
  })
  status: JobStatus;

  @ManyToOne(() => Customer, (customer) => customer.jobs)
  customer: Customer;

  @ManyToOne(() => Business, (business) => business.jobs)
  business: Business;

  @ManyToOne(() => Address)
  address: Address;

  @OneToMany(() => Appointment, (appointment) => appointment.job)
  appointments: Appointment[];

  @OneToMany(() => LabourItem, labourItem => labourItem.job)
  labourItems: LabourItem[];

  @OneToMany(() => MaterialItem, materialItem => materialItem.job)
  materialItems: MaterialItem[];
}
