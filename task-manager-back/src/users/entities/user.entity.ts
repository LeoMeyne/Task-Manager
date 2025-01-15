import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;  // Clé primaire

  @Column({ unique: true })
  username: string;  // Nom d'utilisateur unique

  @Column()
  password: string;  // Mot de passe (hashé)

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];  // Association avec les tâches
}
