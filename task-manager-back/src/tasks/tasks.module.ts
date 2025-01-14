import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';

@Module({
  controllers: [TasksController],
})
export class TasksModule {}
