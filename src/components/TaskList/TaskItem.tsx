import type { TaskItemProps, Task } from "../../types";

export default function TaskItem({
    task,
    onStatusChange,
    onDelete,
    onEdit,
}: TaskItemProps) {
    return (

        <div className="mb-4 ml-0 mt-4 w-[500px] max-w-full rounded-lg border border-slate-600 bg-white p-3">

            <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-medium text-blue-950" >
                    {task.title}
                </h2>

                <div className="flex items-center gap-3">

                    {/*color listTask by type TaskStatus = 'pending' | 'in-progress' | 'completed'; */}
                    {/* dynamic colors based on the current status */}
                    <select
                        className={`rounded-md border-0 px-2 py-1 text-sm outline-none ${task.status === "pending" ? "bg-yellow-100 text-amber-800"
                            : task.status === "in-progress" ? "bg-white text-blue-700"
                                : "bg-white text-green-700"
                            }`}

                        // set the selected option to the current task status
                        value={task.status}

                        // notify the parent component when the status changes
                        onChange={(event) =>
                            onStatusChange(task.id, event.target.value as Task["status"]
                            )
                        }
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress"> In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    {/* calls the parent callback with the task id */}
                    <button className="text-sm text-red-500 hover:text-red-700"
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </button>


                    <button
                        className="rounded-md border-0 bg-yellow-100 p-2 font-semibold text-amber-800"
                        type="button"
                        onClick={() => onEdit(task)}
                    >
                        Edit
                    </button>

                </div >
            </div>

            {/* second row: descripcion, priority and due */}

            <div className="mt-2 flex flex-col gap-1">

                <p className="text-sm text-slate-600">
                    {task.description}
                </p>

                <div className="flex items-center gap-4">

                    <p
                        className={`text-xs ${task.priority === "high" ? "text-red-600"
                            : task.priority === "medium" ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                    >
                        Priority: {task.priority} Due: {task.dueDate}
                    </p>

                    <p className="text-xs text-slate-500">
                        Due: {task.dueDate}
                    </p>
                </div>
            </div>

        </div>
    );
}