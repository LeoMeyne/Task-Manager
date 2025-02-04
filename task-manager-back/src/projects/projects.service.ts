import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,  // Repository to interact with project data

    @InjectRepository(User)
    private usersRepository: Repository<User>,  // Repository to interact with user data
  ) {}

  // Create a new project
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  // Retrieve all projects
  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  // Update a project by ID
  async update(id: number, updateProjectDto: CreateProjectDto): Promise<Project> {
    await this.projectsRepository.update(id, updateProjectDto);
    return this.findOne(id);
  }

  // Remove a project by ID
  async remove(id: number): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Project with ID ${id} not found.`);
  }

  // Add a member to a project
  async addMember(projectId: number, userId: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id: projectId }, relations: ['members'] });
    if (!project) throw new NotFoundException(`Project with ID ${projectId} not found.`);

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found.`);

    // Check if the user is already a member of the project
    if (project.members.some(member => member.id === userId)) {
      throw new ForbiddenException(`User is already a member of the project.`);
    }

    project.members.push(user);
    return this.projectsRepository.save(project);
  }

  // Remove a member from a project
  async removeMember(projectId: number, userId: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id: projectId }, relations: ['members'] });
    if (!project) throw new NotFoundException(`Project with ID ${projectId} not found.`);

    // Remove the member from the project
    project.members = project.members.filter(member => member.id !== userId);
    return this.projectsRepository.save(project);
  }

  // Retrieve a specific project by ID
  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id }, relations: ['tasks'] });
    if (!project) throw new NotFoundException(`Project with ID ${id} not found.`);

    return project;
  }
}
