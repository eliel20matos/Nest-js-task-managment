import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { title } from 'process';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private taskRepository: TaskRepository
  ){}
  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.taskRepository.getTask(filterDto)
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title : title,
      description: description,
      status: TaskStatus.OPEN
    })

    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }
}
