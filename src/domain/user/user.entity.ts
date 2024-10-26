import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar' })
  public name: string;

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }
}
