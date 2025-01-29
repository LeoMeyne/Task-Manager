// 📂 src/projects/projects.service.ts

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
    private projectsRepository: Repository<Project>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Projet avec l'id ${id} non trouvé.`);
    }
    return project;
  }

  async update(id: number, updateProjectDto: CreateProjectDto): Promise<Project> {
    await this.projectsRepository.update(id, updateProjectDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Projet avec l'id ${id} non trouvé.`);
    }
  }

  // ➕ Ajouter un membre au projet
  async addMember(projectId: number, userId: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ['members'],
    });

    if (!project) throw new NotFoundException(`Projet avec l'id ${projectId} non trouvé.`);

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`Utilisateur avec l'id ${userId} non trouvé.`);

    if (project.members.some(member => member.id === userId)) {
      throw new ForbiddenException(`L'utilisateur est déjà membre du projet.`);
    }

    project.members.push(user);
    return this.projectsRepository.save(project);
  }

  // ➖ Retirer un membre du projet
  async removeMember(projectId: number, userId: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ['members'],
    });

    if (!project) throw new NotFoundException(`Projet avec l'id ${projectId} non trouvé.`);

    project.members = project.members.filter(member => member.id !== userId);

    return this.projectsRepository.save(project);
  }
}
