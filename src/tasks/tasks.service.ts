import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository
  ) {}

  async getTaskById(id: number) : Promise<Task> {
    const task: Task = await this.taskRepository.findOne(id)

    if(!task) {
      throw new NotFoundException(`Task with id: ${id} not found`)
    }

    return task
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }

  async deleteTask(id: number) {
    const result: DeleteResult = await this.taskRepository.delete(id)

    if(result.affected === 0) {
      throw new NotFoundException(`Task with ID: ${id} not found`)
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status
    await task.save()
    return task
  }
}
