import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/project.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,  // Inject the tasks repository

    @InjectRepository(Project)
    private projectsRepository: Repository<Project>  // Inject the projects repository
  ) {}

  // Create a new task for a specific project
  async create(createTaskDto: CreateTaskDto, projectId: number): Promise<Task> {
    const project = await this.projectsRepository.findOne({ where: { id: projectId } });

    if (!project) throw new NotFoundException(`Project with ID ${projectId} not found.`);

    const task = this.tasksRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: 'todo',
      project,
    });

    return this.tasksRepository.save(task);
  }

  // Retrieve all tasks with their related data
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['project', 'createdBy'] });
  }

  // Retrieve a specific task by ID
  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['project', 'createdBy'],
    });

    if (!task) throw new NotFoundException(`Task with ID ${id} not found.`);

    return task;
  }

  // Update a task by ID
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  // Remove a task by ID
  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException(`Task with ID ${id} not found.`);
  }
}
