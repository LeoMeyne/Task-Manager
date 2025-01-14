import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return [{ id: 1, title: 'Première tâche', completed: false }];
  }
}
