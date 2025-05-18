import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';

@Entity('labour_items')
export class LabourItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, job => job.labourItems, { onDelete: 'CASCADE' })
  job: Job;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  hours: number;

  @Column('decimal', { precision: 10, scale: 2 })
  rate: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
