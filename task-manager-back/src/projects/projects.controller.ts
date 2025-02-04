import { Controller, Get, Param, ParseIntPipe, NotFoundException, Post, Body, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TasksService } from '../tasks/tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)  // Protect all routes with JWT authentication
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService
  ) {}

  // Retrieve a specific project by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }
    return project;
  }

  // Create a new task within a project
  @Post(':id/tasks')
  async createTask(
    @Param('id', ParseIntPipe) projectId: number,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create(createTaskDto, projectId);
  }

  // Retrieve all projects
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // Create a new project
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
}
