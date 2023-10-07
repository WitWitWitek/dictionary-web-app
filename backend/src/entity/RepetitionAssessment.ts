import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { Repetition } from "./Repetition";

@Entity("repetition_assessment")
export class RepetitionAssessment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  value: number;

  @CreateDateColumn()
  dateOfAssessment: Date;

  @ManyToOne(() => Repetition, (repetition) => repetition.assessments)
  repetition: Repetition;
}
