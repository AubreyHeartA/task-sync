import React from 'react';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

import '../config/style.css';

export default function Dashboard({ taskDetails }) {
    const completedTasksCount = taskDetails.filter(task => task.status === 'Completed').length;
    const pendingTasksCount = taskDetails.filter(task => task.status === 'Pending').length;

    return (
        <div className='dashboard-section'>
            <h1 className='welcome'>Welcome!</h1>
            <div className='task-summary'>
                
                <div className='task-count pending'>
                    <FiCheckCircle size={30} color="white" className='taskIcon' />
                    <h3>Pending Tasks</h3>
                    <p className='number-count'><span>{completedTasksCount}</span> Tasks</p>
                </div>

                <div className='task-count completed'>
                    <FiClock size={35} color="white" className='taskIcon' />
                    <h3>Completed 30</h3>
                    <p className='number-count'><span>{completedTasksCount}</span> Tasks</p>
                </div>  
            </div>
            <div className='all-tasks'>
                <h2>All Tasks</h2>
                {taskDetails.length > 0 ? (
                    <ul>
                        {taskDetails.map((task, index) => (
                            <li key={index} className='task-item'>
                                <div className='task-detail'>
                                    <h4>{task.title}</h4>
                                    {/* <p>{task.description}</p> */}
                                    <p>Status: {task.status}</p>
                                    {/* <p>Category: {task.category}</p> */}
                                    <p>Member: {task.member}</p>
                                    <p className='red-color'>Deadline: {task.dueDate} {task.dueTime}</p>
                                    <p className='blue-color'>Created: {new Date(task.createdAt).toLocaleString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>
        </div>
    );
}

