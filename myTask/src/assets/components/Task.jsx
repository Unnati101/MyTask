// src/components/Task.js

function Task({ task }) {
    return (
        <div className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {/* Display other task properties */}
        </div>
    );
}

export default Task;
