import { TaskStatus } from './TaskStatus';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
};
