import { useState } from 'react';

const TaskList = ({ tasks, deleteTask, updateTasks }) => {
    const statusCategories = ['Pending', 'In Progress', 'Completed', 'Deployed', 'Deferred'];
    const [editTask, setEditTask] = useState(null); // State to track the task being edited
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedAssignee, setEditedAssignee] = useState('');
    const [editedPriority, setEditedPriority] = useState('');
    const [editedStatus, setEditedStatus] = useState('');

    const handleEditClick = (task) => {
        // Set the task being edited and populate the edit form with its current values
        setEditTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditedAssignee(task.assignee);
        setEditedPriority(task.priority);
        setEditedStatus(task.status);
    };

    const handleSaveEdit = () => {
        // Delete the previous task
        deleteTask(editTask.id);
        // Add the updated task as a new task
        const updatedTask = {
            id: Math.floor(Math.random() * 10000), // Generate a random ID for simplicity
            title: editedTitle,
            description: editedDescription,
            assignee: editedAssignee,
            priority: editedPriority,
            status: editedStatus
        };
        // Update tasks in the App component
        updateTasks(editTask.id, updatedTask);
        // Clear edit state
        setEditTask(null);
        setEditedTitle('');
        setEditedDescription('');
        setEditedAssignee('');
        setEditedPriority('');
        setEditedStatus('');
    };
    const getRandomColor = () => {
        const randomColor = () => Math.floor(Math.random() * 150); // Generate random number between 0 and 150
        const r = randomColor();
        const g = randomColor();
        const b = randomColor();
        return `rgb(${r}, ${g}, ${b})`; // Return a random dark color in RGB format
    };
    return (
        <div className="task-list-container">
            {statusCategories.map(status => (
                <div key={status} className="status-section">
                    <h2 className="status-heading" style={{ backgroundColor: getRandomColor() }}>{status}</h2> {/* Status heading */}
                    <div className="task-list">
                        {tasks.filter(task => task.status === status).map(task => (
                            <div key={task.id} className="task">
                                {editTask === task ? (
                                    <div>
                                        {/* Edit form */}
                                        <input
                                            type="text"
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                        />
                                        <textarea
                                            value={editedDescription}
                                            onChange={(e) => setEditedDescription(e.target.value)}
                                        ></textarea>
                                        <input
                                            type="text"
                                            value={editedAssignee}
                                            onChange={(e) => setEditedAssignee(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            value={editedPriority}
                                            onChange={(e) => setEditedPriority(e.target.value)}
                                        />
                                        <select
                                            value={editedStatus}
                                            onChange={(e) => setEditedStatus(e.target.value)}
                                        >
                                            {statusCategories.map((statusOption) => (
                                                <option key={statusOption} value={statusOption}>{statusOption}</option>
                                            ))}
                                        </select>
                                        <button onClick={handleSaveEdit}>Save</button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3>{task.title}</h3>
                                        <p>{task.description}</p>
                                        <p>Assignee: {task.assignee}</p>
                                        <p>Priority: {task.priority}</p>
                                        <p>Status: {task.status}</p>
                                        <div className="task-buttons">
                                            {task.status !== 'Completed' && (
                                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                                            )}

                                            <button onClick={() => handleEditClick(task)}>Edit</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
