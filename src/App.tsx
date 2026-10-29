import { useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import type { Task, TaskFormData, TaskStatus } from "./types";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(formData: TaskFormData) {
      const newTask: Task = {
        
      // generates a unique identifier for each task
        id: crypto.randomUUID(),
      // The spread operator copies all properties from formData  into the new object.
        ...formData,
      };

    setTasks((previousTasks) => [...previousTasks, newTask]);

     console.log("new task =====>", newTask);
   
    }

   //  delete a task by filtering out the task with the matching id
  function handleDelete(taskId: string) {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskId)
    );
  }

  // Update the status of the task with the matching id
  function handleStatusChange(taskId: string, newStatus: TaskStatus) {

    console.log("task id =====>", taskId);
    console.log("new status===>", newStatus);

    // create a new array with the updated task status
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
      
    );
  }


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