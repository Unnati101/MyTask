import { useState } from 'react';
import './TaskForm.css'; // Import the CSS file for styling the pop-up form
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('P1');
    const [status, setStatus] = useState('Pending');
    const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !assignee) {
            alert('Please fill in all fields.');
            return;
        }

        const newTask = {
            id: Math.floor(Math.random() * 10000), // Generate a random ID for simplicity
            title,
            description,
            startDate: new Date(),
            status,
            assignee,
            priority
        };

        addTask(newTask);
        // Clear form fields and hide the form
        setTitle('');
        setDescription('');
        setAssignee('');
        setPriority('P1');
        setStatus('Pending');
        setShowForm(false);
    };

    return (
        <div className="task-form-container">
            &nbsp; &nbsp;
            <button className="add-task-btn" onClick={() => setShowForm(true)}><AddCircleIcon /></button>
            {showForm && (
                <div className="task-form-overlay">
                    <div className="task-form">
                        <h2>Add New Task</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Title:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label>Description:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            <label>Assignee:</label>
                            <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
                            <label>Priority:</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="P0">P0</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                            </select>
                            <label>Status:</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Deployed">Deployed</option>
                                <option value="Deferred">Deferred</option>
                            </select>
                            <div className="form-buttons">
                                <button type="submit">Add Task</button>
                                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskForm;
