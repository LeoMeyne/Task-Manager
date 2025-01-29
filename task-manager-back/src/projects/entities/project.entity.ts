import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.projects, { eager: true, onDelete: 'CASCADE' })
  teamLeader: User;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  members: User[];

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];
}
