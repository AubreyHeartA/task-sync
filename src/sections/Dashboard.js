import React from 'react';
import '../config/style.css';

export default function Dashboard({ taskDetails }) {
    const completedTasksCount = taskDetails.filter(task => task.status === 'Completed').length;
    const pendingTasksCount = taskDetails.filter(task => task.status === 'Pending').length;

    return (
        <div className='dashboard-section'>
            <h1 className='welcome'>Welcome!</h1>
            <div className='task-summary'>
                <div className='task-count-completed'>
                    <h3>Completed Tasks</h3>
                    <p>{completedTasksCount}</p>
                </div>
                <div className='task-count-pending'>
                    <h3>Pending Tasks</h3>
                    <p>{pendingTasksCount}</p>
                </div>
            </div>
        </div>
    );
}
