import { Task } from './Task';

export type TasksByDate = {
  [date: string]: Task[];
};
