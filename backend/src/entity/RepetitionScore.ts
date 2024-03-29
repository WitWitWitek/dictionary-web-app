import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { Repetition } from "./Repetition";

@Entity("repetition_assessment")
export class RepetitionScore extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false, length: 36 })
  userId: string;

  @ManyToOne(() => Repetition, (repetition) => repetition.scores, { onDelete: "CASCADE" })
  repetition: Repetition;
}
