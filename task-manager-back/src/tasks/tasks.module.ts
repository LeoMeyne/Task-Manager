import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/project.entity';
import { ProjectsModule } from '../projects/projects.module';


@Module({
  imports: [TypeOrmModule.forFeature([Task, Project]), ProjectsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
