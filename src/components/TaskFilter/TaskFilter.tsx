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
        <div className="p-4">
            <div className="mb-6 -mt-4 flex flex-wrap justify-start gap-4 pl-6">

                <div>
                    {/* Status Filter */}
                    <label className="mb-1 block font-medium text-sm text-slate-700">
                        Status:
                    </label>

                    <select
                        value={status}
                        onChange={(event) =>
                            handleStatusChange(event.target.value as TaskStatus | "all")
                        }
                        className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm"

                    >
                        <option value="all">All statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    {/* Priority Filter */}
                    <label className="mb-1 block font-medium text-sm text-slate-700">
                        Priority:
                    </label>

                    <select
                        value={priority}
                        onChange={(event) =>
                            handlePriorityChange(event.target.value as TaskPriority | "all")
                        }
                        className="rounded-md border border-gray-200  px-3 py-2 shadow-sm"
                        aria-label="Filter by priority"
                    >
                        <option value="all">All priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
        </div>
    );
}