import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ...Object.keys(TaskStatus)
  ]

  transform(value: string) {
    value = value.toUpperCase()

    if(!this.isValidStatus(value)) {
      throw new BadRequestException('Invalid status')
    }

    return value
  }

  isValidStatus(value: string): boolean {
    return this.allowedStatuses.includes(value)
  }
}