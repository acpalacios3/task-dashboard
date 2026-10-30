## "React Dashboard Application"**

## Description

***This project creates an interactive Task Dashboard application that demonstrates component-based architecture, state management, event handling, form validation, and data management in React.

The application allows users to create, edit, delete, search, filter, and sort tasks. Each task includes a title, description, status, priority, and due date.

The dashboard also displays task statistics, including total tasks, pending tasks, in-progress tasks, and completed tasks.

Additionally, users can import and export tasks using JSON files. The application uses localStorage to persist task data in the browser, allowing tasks to remain available after refreshing the page.

***

## Technologies Used

1. React: To build reusable UI components and update the interface dynamically.
2. TypeScript: To define interfaces, specify prop types, and improve type safety.
3. JavaScript: To implement event handling, array operations, filtering, sorting, and data processing.
4. React Hooks (useState): To manage application state, including tasks, filters, and form data.
5. React Hooks (useEffect): To synchronize task data with localStorage and update the form when editing a task.
6. Tailwind CSS: To style the application, manage spacing, apply colors, and create a responsive layout.
7. Vite: To run the development server and build the application.
8. Browser APIs (localStorage and File API): To persist task data and support JSON file import and export.


## How to Run the Application

1. Install the dependencies:
npm install
2. Start the development server:
npm run dev
3. Open the local URL displayed in the terminal in your browser.

## Tailwind CSS Installation
1. Installed Tailwind CSS and the Vite plugin using:
 npm install tailwindcss @tailwindcss/vite.

2. Configured the Tailwind CSS plugin in vite.config.ts.
3. Imported Tailwind CSS in the main CSS file using @import "tailwindcss";.

## Components

**1. App**

The App component is the main parent component responsible for managing the application state and coordinating the child components.It manages the task collection and provides functions to add, edit, delete, and update tasks.It also calculates task statistics and coordinates the import and export functionality.

**2. TaskForm**

The TaskForm component provides a form to create new tasks and edit existing ones.
It uses the useState Hook to manage form data and the useEffect Hook to update the form when a task is selected for editing.It also uses the validateTask() utility function to validate required fields before submitting the form.The component receives the onSubmit callback and the taskToEdit object through props.


3. TaskList

The TaskList component receives the task collection through props and displays the tasks.
It provides the filtering and task organization functionality and passes callback functions to TaskItem to handle task status changes, deletion, and editing.

4. TaskItem

The TaskItem component displays the information for an individual task, including its title, description, status, priority, and due date.
It also provides controls to update the task status, delete the task, and edit the task.


5. TaskFilter

The TaskFilter component provides controls to filter tasks by status and priority.
It also supports searching and sorting tasks.

6. ValidateTask
The ValidateTask component validates task data before it is submitted.


## TypeScript Interfaces

I used TypeScript interfaces and types to define the structure of the task data and the props passed between components.



