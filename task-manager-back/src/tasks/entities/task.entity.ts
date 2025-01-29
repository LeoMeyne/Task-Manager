import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';


@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'todo' })
  status: 'todo' | 'in_progress' | 'done';

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;  // Association avec un utilisateur

  @ManyToOne(() => Project, (project) => project.tasks, { eager: true, onDelete: 'CASCADE' })
  project: Project;
}
