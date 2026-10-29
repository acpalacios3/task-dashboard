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

  // state for search bar 
const [searchTerm, setSearchTerm] = useState("");


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


  // Searches tasks by title or description.
const searchedTasks = filteredTasks.filter((task) =>
  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  task.description.toLowerCase().includes(searchTerm.toLowerCase())
);


  //  sort by title and dueDate
  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    return a.dueDate.localeCompare(b.dueDate);
  });


  return (
    <div className="mb-4">

      <TaskFilter onFilterChange={setFilters} />

      <div>
          <label htmlFor="search" className="mb-1 block font-medium">
              Search tasks
          </label>
        

          {/* enter text for search for tasks */}
          <input
              type="text"
              placeholder="Search tasks by title or description.."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 bg-white p-2"
          />
      </div>

      <div>
          <label htmlFor="search" className="mb-1 block font-medium">
              Sort by
          </label>

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
      </div>

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