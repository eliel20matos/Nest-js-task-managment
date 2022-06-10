import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {}
