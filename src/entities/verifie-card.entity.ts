/* eslint-disable prettier/prettier */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  @Entity('verifie-cards')
  export class VerifieCard extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:null})
    idBadge: string;
  
    @Column({default: "INVALID"})
    type_verifier: string;
  
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
  }
  