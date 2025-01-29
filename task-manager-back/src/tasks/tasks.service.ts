import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,

    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectsRepository.findOne({
      where: { id: createTaskDto.projectId }
    });

    if (!project) {
      throw new NotFoundException(`Projet avec l'id ${createTaskDto.projectId} non trouvé.`);
    }

    const task = new Task();  // ✅ Correction : utiliser un objet explicite
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = 'todo';
    task.project = project;  // 🔗 Lier la tâche au projet

    return this.tasksRepository.save(task);
  }


  // Récupérer toutes les tâches
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  // Récupérer une tâche par ID
  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Tâche avec l'id ${id} non trouvée`);
    return task;
  }

  // Mettre à jour une tâche
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  // Supprimer une tâche
  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Tâche avec l'id ${id} non trouvée`);
  }
}
