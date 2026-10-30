import { useState, useEffect } from "react";
import type { TaskFormData, Task } from "../../types";
import { validateTask } from "../../utils/TaskUtils";


// export type TaskStatus = 'pending' | 'in-progress' | 'completed';
// export type TaskPriority = 'low' | 'medium' | 'high';

// export interface TaskFormData {
//   title: string;
//   description: string;
//   status: TaskStatus;
//   priority: TaskPriority;
//   dueDate: string;
// }

interface TaskFormProps {
    onSubmit: (FormData: TaskFormData) => void;
    taskToEdit: Task | null;

}

export default function TaskForm({ onSubmit, taskToEdit }: TaskFormProps) {
    // stores the values entered in the form
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
    });


    // loads the selected task into the form for editing.
    useEffect(() => {
        setErrors([]);

        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description,
                status: taskToEdit.status,
                priority: taskToEdit.priority,
                dueDate: taskToEdit.dueDate,
            });
        } else {
            setFormData({
                title: "",
                description: "",
                status: "pending",
                priority: "medium",
                dueDate: "",
            });
        }

    }, [taskToEdit]);


    // Stores validation error messages
    const [errors, setErrors] = useState<string[]>([]);

    // updates the corresponding field whenever the user types or selects a value
    function handleChange(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const { name, value } = event.target;
        // copies form data and updates only the changed field
        const updatedFormData = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedFormData);

       // validate form data using validateTask
      setErrors(validateTask(updatedFormData));
        
    }


    // handles form submission and prevents the browser's default behavior

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Validate the form data 
        const validationErrors = validateTask(formData);

        setErrors(validationErrors);
        // Stop submission if validation fails
        if (validationErrors.length > 0) {
            return;
        }
        // sends the form data to the parent component through the callback
        onSubmit(formData);

        // form fields to their initial values
        setFormData({
            title: '',
            description: '',
            status: 'pending',
            priority: 'medium',
            dueDate: '',
        });
    }

    return (
        // renders the form fields and the submit button
        <form onSubmit={handleSubmit} noValidate>

            <div>
                <label htmlFor="title">
                    Task Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    // required
                    className={`rounded-md border p-2 ${errors.includes("Task title is required.")
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                />

                {errors.includes("Title is required.") && (
                    <p className="text-sm text-red-500">
                        Task title is required.
                    </p>
                )}
            </div>

            <div>

                <label htmlFor="description">
                    description
                </label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                // required
                />
                {errors.includes("Description is required.") && (
                    <p className="text-sm text-red-500">
                        Description is required.
                    </p>
                )}

            </div>


            <div>

                <label htmlFor="status">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

            </div>

            <div>

                <label htmlFor="priority">
                    Priority
                </label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

            </div>

            <div>

                <label htmlFor="dueDate">
                    Due Date
                </label>
                <input
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500
               [color-scheme:light]"
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                // required
                />
                {errors.includes("Due date is required.") && (
                    <p className="text-sm text-red-500">
                        Due date is required.
                    </p>
                )}

            </div>
            {/* submits the form  */}
            <button
                className=" rounded-md border bg-blue-600 p-2 font-semibold text-white"
                type="submit"
            >
                {taskToEdit ? "Update Task" : "Add Task"}
            </button>

        </form>
    )
}
