import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)  // Protect routes with JWT authentication
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Handle POST requests to create a new task
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const userId = req.user.id;  // Associate task with the authenticated user
    return this.tasksService.create(createTaskDto, userId);
  }

  // Handle GET requests to retrieve all tasks
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // Handle GET requests to retrieve a specific task by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  // Handle PATCH requests to update a task by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  // Handle DELETE requests to remove a task by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
