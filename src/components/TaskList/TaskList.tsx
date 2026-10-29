import { useState } from "react";
import type { TaskListProps, TaskStatus, TaskPriority } from "../../types"; 
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskItem from "./TaskItem";

type TaskFilters = {
  status?: TaskStatus | "all";
  priority?: TaskPriority | "all";
};


export default function TaskList({
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
}: TaskListProps) {

   const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
  });

  // Filters tasks by status and priority.
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filters.status === "all" ||
      !filters.status ||
      task.status === filters.status;

    const matchesPriority =
      filters.priority === "all" ||
      !filters.priority ||
      task.priority === filters.priority;

    return matchesStatus && matchesPriority;
});

  return (
    <div>

      <TaskFilter onFilterChange={setFilters} />
      
      {/* {tasks.map((task) => ( */}
        {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}