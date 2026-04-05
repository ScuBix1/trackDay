import { Task } from '@/types/Task';
import { TaskStatus } from '@/types/TaskStatus';
import { TasksByDate } from '@/types/TasksByDate';
import { useState } from 'react';

export function useTasks() {
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});

  const addTask = (date: string, task: Task) => {
    setTasksByDate((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), task],
    }));
  };

  const updateTaskStatus = (
    date: string,
    taskId: string,
    status: TaskStatus
  ) => {
    setTasksByDate((prev) => ({
      ...prev,
      [date]:
        prev[date]?.map((task) =>
          task.id === taskId ? { ...task, status } : task
        ) || [],
    }));
  };

  const getTasksByDate = (date: string) => tasksByDate[date] || [];

  return {
    tasksByDate,
    addTask,
    updateTaskStatus,
    getTasksByDate,
  };
}
