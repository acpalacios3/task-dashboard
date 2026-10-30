import type {TaskFormData } from "../types";

// Validate task form data before submitting.
export function validateTask(task: TaskFormData): string[] {

    const errors: string[] = [];

    // check if the task title is empty.
    if (!task.title.trim()) {
        errors.push("Title is required.");
    }
    // check if the description title is empty.
    if (!task.description.trim()) {
        errors.push("Description is required.");
    }

    // check if the due date is empty.
    if (!task.dueDate) {
        errors.push("Due date is required.");
    }

    return errors;
}
