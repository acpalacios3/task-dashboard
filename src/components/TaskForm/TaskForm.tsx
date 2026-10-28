import { useState } from "react";
import type { TaskFormData } from "../../types";

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

}

export default function TaskForm({ onSubmit }: TaskFormProps) {
    // stores the values entered in the form
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
    });
    // updates the corresponding field whenever the user types or selects a value
    function handleChange(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const { name, value } = event.target;
        // copies form data and updates only the changed field
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // handles form submission and prevents the browser's default behavior
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

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
        <form onSubmit={handleSubmit}>

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
                />
            </div>

            <div>

                <label htmlFor="title">
                    Descripcion
                </label>
                <input
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    value={formData.descripcion}
                    onChange={handleChange}
                />

            </div>


            <div>

                <label htmlFor="title">
                    Status
                </label>
                <input
                    id="status"
                    name="status"
                    type="text"
                    value={formData.status}
                    onChange={handleChange}
                />

            </div>

            <div>

                <label htmlFor="title">
                    Status
                </label>
                <input
                    id="priority"
                    name="priority"
                    type="text"
                    value={formData.priority}
                    onChange={handleChange}
                />

            </div>

            <div>

                <label htmlFor="title">
                    Status
                </label>
                <input
                    id="dueDate"
                    name="dueDate"
                    type="text"
                    value={formData.dueDate}
                    onChange={handleChange}
                />

            </div>
             {/* submits the form  */}
            <button
                className=" rounded-md border bg-blue-600 p-2 font-semibold text-white "
                type="submit"
            >
                Add Task
            </button>

        </form>
    )
}
