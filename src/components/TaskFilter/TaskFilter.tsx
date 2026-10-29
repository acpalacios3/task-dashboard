import { useState } from "react";
import type { TaskStatus, TaskPriority } from "../../types";
import type { TaskFilterProps } from "../../types";

export default function TaskFilter({ onFilterChange, }: TaskFilterProps) {

    const [status, setStatus] = useState<TaskStatus | "all">("all");
    const [priority, setPriority] = useState<TaskPriority | "all">("all");

    function handleStatusChange(value: TaskStatus | "all") {
        setStatus(value);
        onFilterChange({
            status: value,
            priority,
        });
    }

    function handlePriorityChange(value: TaskPriority | "all") {
        setPriority(value);

        onFilterChange({
            status,
            priority: value,
        });
    }

    return (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <select
                value={status}
                onChange={(event) =>
                    handleStatusChange(event.target.value as TaskStatus | "all")
                }
                className="rounded-md border border-gray-300 bg-white p-2"
                aria-label="Filter by status"
            >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <select
                value={priority}
                onChange={(event) =>
                    handlePriorityChange(event.target.value as TaskPriority | "all")
                }
                className="rounded-md border border-gray-300 bg-white p-2"
                aria-label="Filter by priority"
            >
                <option value="all">All priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    );
}