import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;  // Clé primaire

  @Column({ unique: true })
  username: string;  // Nom d'utilisateur unique

  @Column()
  password: string;  // Mot de passe (hashé)

  @OneToMany(() => Task, (task) => task.createdBy)
  tasks: Task[];  // Association avec les tâches

  @OneToMany(() => Project, (project) => project.teamLeader)
  projects: Project[];  // Projets créés par l'utilisateur

  @Column({ default: 'user' })
  role: 'user' | 'team_leader';

}
