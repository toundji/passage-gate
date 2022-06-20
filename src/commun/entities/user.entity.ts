/* eslint-disable prettier/prettier */
import { hash } from 'bcrypt';
import { RoleName } from 'src/enums/role-name';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
 
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: RoleName;

  @Column()
  api_token: string;

  @Column()
  account_number: number;

  @Column()
  remember_token: string;

  @CreateDateColumn()
  email_verified_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  @BeforeInsert()  async hashPassword() {
    this.password = await hash(this.password, 10);  
  }
}
