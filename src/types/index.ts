// 1. Task data structure

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

/* 2. Form data */

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}


// 3. Component props

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string,
    newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}


export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string,
    newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void
}


// 4. TaskFilter options
export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus | 'all';
    priority?: TaskPriority | 'all';
  }) => void;
}