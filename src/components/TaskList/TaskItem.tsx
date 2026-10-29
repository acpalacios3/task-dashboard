import type { TaskItemProps, Task } from "../../types";

export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
  onEdit,
}: TaskItemProps) {
  return (
    <article className="mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-bold">
        {task.title}
      </h3>

      <p>{task.description}</p>

      <p>Status: {task.status}</p>

      <p>Priority: {task.priority}</p>

      <p>Due date: {task.dueDate}</p>

      <div className="mt-3 flex gap-2">
        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value as Task["status"])
          }
          className="rounded-md border border-gray-300 p-2"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          className="rounded-md border bg-blue-600 p-2 font-semibold text-white"
          type="button"
          onClick={() => onDelete(task.id)}

        >
          Delete
        </button>

        <button
          className="rounded-md border bg-blue-600 p-2 font-semibold text-white"
          type="button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

      </div>
    </article>
  );
}