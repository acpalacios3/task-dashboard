import { useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import type { Task, TaskFormData } from "./types";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(formData: TaskFormData) {
      const newTask: Task = {
        
      // generates a unique identifier for each task
        id: crypto.randomUUID(),
      // The spread operator copies all properties from formData  into the new object.
        ...formData,
      };

      setTasks([...tasks, newTask]);

     console.log("new task =====>", newTask);
     console.log("current tasks =======>", [...tasks, newTask]); 

    }

    function handleStatusChange(){}
    function handleDelete(){}
    function handleEdit(){}

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-1xl font-bold">
        Task Dashboard
      </h1>
      <div>
        {/* TaskForm component */}
        <TaskForm onSubmit={handleAddTask} />
        
        {/* TaskList component */}
        <TaskList
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      </div>

    </div>

  );
}

export default App;