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
import { RepetitionScore } from "./RepetitionScore";

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

  @Column({ default: null, nullable: true, type: "decimal", precision: 3, scale: 2 })
  averageScore: number;

  @OneToMany(() => RepetitionScore, (repetitionScore) => repetitionScore.repetition, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  scores: RepetitionScore[];
}
