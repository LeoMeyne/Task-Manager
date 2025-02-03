import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { User } from '../users/entities/user.entity';
import { TasksModule } from '../tasks/tasks.module';  // Maintenir cet import

@Module({
  imports: [TypeOrmModule.forFeature([Project, User]), TasksModule],  // Cet import reste
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
