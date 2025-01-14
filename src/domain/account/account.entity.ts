import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn({type: 'varchar'})
  public name: string;

  constructor(partial: Partial<Account> = {}) {
    Object.assign(this, partial);
  }
}