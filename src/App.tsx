import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import type { Task, TaskFormData, TaskStatus } from "./types";
import type { ChangeEvent } from "react";

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


// Creates a new task or Edit 

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


   //  Export data to jSON format file
 function handleExport() {
    // convert formData into JSON text (null: we do not apply any filter or transformation,2 we use two spaces to visually organize the JSON. ) 
    const jsonData = JSON.stringify(tasks, null, 2);

    // Blob create a file, Blob is a browser API that allows for the creation of an object containing binary or text data.
    const blob = new Blob([jsonData], {
        type: "application/json",
    });

    // create a temporary URL
    const url = URL.createObjectURL(blob);
    // create a download link
    const link = document.createElement("a");

    link.href = url;
    link.download = "tasks.json";

    // start download
    link.click();
    // release temporary URL
    URL.revokeObjectURL(url);
}   



// Validate the data before importing the data from the JSON file.

function isValidTaskArray(data: unknown): data is Task[] {
    return (
        Array.isArray(data) &&
        data.every((task) =>
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            typeof task.description === "string" &&
            typeof task.dueDate === "string" &&
            ["pending", "in-progress", "completed"].includes(task.status) &&
            ["low", "medium", "high"].includes(task.priority)
        )
    );
}


async function handleImport(
    event: ChangeEvent<HTMLInputElement>
) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
        const fileText = await file.text();

        const importedTasks: unknown = JSON.parse(fileText);

        if (!isValidTaskArray(importedTasks)) {
            alert("Invalid task file format.");
            return;
        }

        setTasks(importedTasks);

        alert("Tasks imported successfully!");

    } catch (error) {
        console.error("Import error:", error);
        alert("Unable to import the JSON file.");
    }

    event.target.value = "";
}


  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-1xl font-bold">
        Task Dashboard
      </h1>
      <div>


        <div className="flex gap-3 mb-6">

              {/* Export tasks */}
              <button
                  type="button"
                  onClick={handleExport}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                  Export Tasks
              </button>

              {/* Import tasks */}

              <label
                  htmlFor="import-tasks"
                  className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                  Import Tasks
              </label>

              <input
                  id="import-tasks"
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImport}
                  className="hidden"
              />

              
</div>




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