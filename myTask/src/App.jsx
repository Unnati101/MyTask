import { useState } from 'react';
import './App.css'; // Assuming you have a CSS file for styling
import TaskForm from './assets/components/TaskForm';
import TaskList from './assets/components/TaskList';
import Filters from './assets/components/Filters'; // Import the Filters component
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const initialTasks = [
  // Initial tasks data
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(null); // State to store filtered tasks
  const [sortBy, setSortBy] = useState(null); // State to store sorting criteria

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowForm(false); // Close the form after adding task
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const applyFilters = (filters) => {
    // Filter tasks based on the filter criteria
    let filtered = tasks.filter(task => {
      let pass = true;
      if (filters.assignee && task.assignee !== filters.assignee) {
        pass = false;
      }
      if (filters.startDate && new Date(task.startDate) < new Date(filters.startDate)) {
        pass = false;
      }
      if (filters.priority && task.priority !== filters.priority) {
        pass = false;
      }
      return pass;
    });

    // Sort tasks based on the sorting criteria if set
    if (sortBy === 'priority') {
      filtered.sort((a, b) => a.priority.localeCompare(b.priority));
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    setFilteredTasks(filtered);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    applyFilters({});
  };

  const updateTasks = (oldTaskId, updatedTask) => {
    // Find the index of the old task
    const taskIndex = tasks.findIndex(task => task.id === oldTaskId);
    // Replace the old task with the updated task
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    // Update the tasks state
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <div className='top-section'>
        <h1>Task Board</h1>
        <SupervisorAccountIcon />
      </div>

      <div className='f'>
        <Filters applyFilters={applyFilters} />
        <br></br>
        <TaskForm addTask={addTask} />
      </div>

      <div className="sort-section">
        <label>Sort By:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="priority">Priority</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="task-containers">
        <TaskList
          tasks={filteredTasks || tasks} // Use filteredTasks if available, otherwise use all tasks
          deleteTask={deleteTask}
          updateTasks={updateTasks} // Pass the updateTasks function to TaskList
        />
      </div>
    </div>
  );
};

export default App