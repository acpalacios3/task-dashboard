import { useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import type { Task, TaskFormData } from "./types";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(formData: TaskFormData) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...formData,
      };

      setTasks([...tasks, newTask]);

    }


  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-1xl font-bold">
        Task Dashboard
      </h1>
      <div>
        <TaskForm onSubmit={handleAddTask} />

        {tasks.map((task) => (
          <article key={task.id} className="rounded-lg border p-4">
            <h3>Title:{task.title}</h3>
            <p>Description{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due date: {task.dueDate}</p>
          </article>
        ))}

        </div>
    </div>

  );
}

export default App;