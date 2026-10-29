import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import type { Task, TaskFormData, TaskStatus } from "./types";

function App() {

  // useState keeps the data in memory. When we refresh the page, the tasks are lost.
  // const [tasks, setTasks] = useState<Task[]>([]); 


  // open your Task Dashboard, retrieves the tasks saved in the browser instead of always starting with an empty list.

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
});

// add, edit, or delete a task, the information in localStorage is updated.

useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);




  const [editingTask, setEditingTask] = useState<Task | null>(null);


  function handleAddTask(formData: TaskFormData) {
  
    if (editingTask) {
    // Updates the existing task and preserves its ID.
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...formData }
          : task
      )
    );

    setEditingTask(null);

  } else {
    // Creates a new task.
    const newTask: Task = {
      // generates a unique identifier for each task
      id: crypto.randomUUID(),
      // The spread operator copies all properties from formData  into the new object.
      ...formData,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
     console.log("new task =====>", newTask);
  }
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

  function handleEdit(task: Task) {
     setEditingTask(task);
   }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-1xl font-bold">
        Task Dashboard
      </h1>
      <div>
        {/* TaskForm component */}
        <TaskForm onSubmit={handleAddTask}
         taskToEdit={editingTask}
        
        />

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