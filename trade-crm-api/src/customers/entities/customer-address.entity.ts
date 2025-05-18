import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from './customer.entity';
import { Address } from '../../addresses/entities/address.entity';

@Entity('customer_addresses')
export class CustomerAddress extends BaseEntity {
  @ManyToOne(() => Customer, (customer) => customer.addresses)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
