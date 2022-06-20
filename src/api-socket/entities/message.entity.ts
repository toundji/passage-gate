/* eslint-disable prettier/prettier */
import { User } from 'src/commun/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity('messages')
  export class Message {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(type => User, {nullable:false, eager:true})
    user?: User;

  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  