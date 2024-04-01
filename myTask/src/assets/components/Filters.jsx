import React from 'react';
import './Filters.css'; // Import CSS file for styling

const Filters = ({ applyFilters }) => {
    const handleApplyFilters = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const filters = {
            assignee: formData.get('assignee'),
            startDate: formData.get('startDate'),
            priority: formData.get('priority')
        };
        applyFilters(filters);
    };

    return (
        <div className="filter-section">
            <h3>Filter By: </h3>
            &nbsp;
            <form onSubmit={handleApplyFilters} className="filter-form">
                <label htmlFor="assignee">Assignee:</label>
                <input type="text" id="assignee" name="assignee" />
                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" name="startDate" />
                <label htmlFor="priority">Priority:</label>
                <select id="priority" name="priority">
                    <option value="">All</option>
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                </select>
                <button type="submit" className="apply-btn">Apply Filters</button>
            </form>
        </div>
    );
};

export default Filters;
