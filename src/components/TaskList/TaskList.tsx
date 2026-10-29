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


  //  useState for filtering by status and priority
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
  });

  //  useState for sorting functionality
  const [sortBy, setSortBy] = useState<"title" | "dueDate">("title");


  // filters tasks by status and priority.
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

  //  sort by title and dueDate
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    return a.dueDate.localeCompare(b.dueDate);
  });


  return (
    <div>

      <TaskFilter onFilterChange={setFilters} />

      <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value as "title" | "dueDate")
          }
          className="mb-4 rounded-md border border-gray-300 bg-white p-2"
        >
          <option value="title">Sort by Title (A–Z)</option>
          <option value="dueDate">Sort by Due Date</option>
      </select>




      {/* {tasks.map((task) => ( */} 
      {/* {filteredTasks.map((task) => ( */}


        {sortedTasks.map((task) => (
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