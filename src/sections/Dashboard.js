import React from 'react';
import '../config/style.css';

export default function Dashboard({ ongoingTasks, completedTasks, taskDetails }) {
    // // const formatDate = (dateString) => {
    // //     const options = { 
    // //         year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    // //     };
    // //     return new Date(dateString).toLocaleDateString(undefined, options);
    // // };

    // const getPriorityClass = (priority) => {
    //     switch (priority) {
    //         case 'High':
    //             return 'high-priority';
    //         case 'Medium':
    //             return 'medium-priority';
    //         case 'Low':
    //             return 'low-priority';
    //         default:
    //             return '';
    //     }
    // };

    return (
        <div className='dashboard-section'>
            <h1 className='welcome'>Welcome!</h1>
            {/* <div className="task-counts">
                <div className="task-count ongoing">
                    <h3>Ongoing Tasks</h3>
                    <p>{ongoingTasks}</p>
                </div>
                <div className="task-count completed">
                    <h3>Completed Tasks</h3>
                    <p>{completedTasks}</p>
                </div>
            </div> */}
            {/* <div className="task-list">
                <h3>All Tasks</h3>
                {taskDetails.length === 0 ? (
                    <p>No tasks available</p>
                ) : (
                    taskDetails.map((task, index) => (
                        <div key={index} className="task-item">
                            <div className="task-details">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p className='red-color'>Due Date: {task.dueDate} {task.dueTime}</p>
                                <p>Member: {task.member}</p>
                                <div className='bottom'>
                                    <h4 className={getPriorityClass(task.priority)}>{task.priority}</h4>
                                    <p className='blue-color'>Date Created: {formatDate(task.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )} */}
            {/* </div> */}
        </div>
    );
}
