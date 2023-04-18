import { Request } from 'express';
import { Task } from './Task';

export interface UpdateTaskRequest extends Request {
  params: {
    taskId: string;
  };
  body: Task;
}

export interface DeleteTaskRequest extends Request {
    params: {
      taskId: string;
    };
  }