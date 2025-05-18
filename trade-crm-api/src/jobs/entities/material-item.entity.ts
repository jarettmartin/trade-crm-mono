import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';

@Entity('material_items')
export class MaterialItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, job => job.materialItems, { onDelete: 'CASCADE' })
  job: Job;

  @Column()
  name: string;

  @Column('integer')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
