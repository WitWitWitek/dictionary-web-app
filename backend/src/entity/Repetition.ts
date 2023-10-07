import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { RepetitionAssessment } from "./RepetitionAssessment";

@Entity("repetition")
export class Repetition extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.repetitions)
  user: User;

  @OneToMany(() => RepetitionAssessment, (repetitionAssessment) => repetitionAssessment.repetition, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  assessments: RepetitionAssessment[];
}
