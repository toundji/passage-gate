/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('sites')
export class Site extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  site: string;

  @Column()
  voie: string;

  @Column()
  montant: number;

  @Column()
  solde_initial: number;

  @Column()
  montant_restant: number;

  @Column()
  abonner_id: number;

  @Column()
  idBadge: string;

  @Column({default:false,  nullable:false})
  is_sent: boolean;

  @Column({default:false,  nullable:false})
  is_sentE: boolean;

  @Column({default:false,  nullable:false})
  is_sentA: boolean;

  @Column({default:false,  nullable:false})
  is_sentG: boolean;

  @Column()
  passage_verified_at: Date;

  @Column({default: "CARTE"})
  type_passage: string;

  @Column()
  percepteur: string;

  @Column({default:"ONLINE", nullable:false})
  statut: string;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}
