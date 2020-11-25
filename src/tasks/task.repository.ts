import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask (
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto

    const task: Task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    task.user = user
    await task.save()

    delete task.user
    
    return task
  }
}