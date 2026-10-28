import type { TaskListProps } from "../../types"; 
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
}: TaskListProps) {
  return (
    <div>
      {tasks.map((task) => (
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