import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FiCheckCircle, FiClock } from 'react-icons/fi';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import '../config/style.css';

export default function Dashboard({ taskDetails }) {
    const [showMembers, setShowMembers] = useState(false);

    const completedTasksCount = taskDetails.filter(task => task.status === 'Completed').length;
    const pendingTasksCount = taskDetails.filter(task => task.status === 'Pending').length;

    const handleShowMembers = () => {
        setShowMembers(true);
    };

    const handleShowTasks = () => {
        setShowMembers(false);
    };

    return (
        <div className='dashboard-section'>
            {showMembers ? (
                <Members onHomeClick={handleShowTasks} />
            ) : (
                <>
                    <h1 className='welcome'>Welcome!</h1>
                    <div className='task-summary'>
                        <div className='task-count pending'>
                            <FiCheckCircle size={30} color="white" className='taskIcon' />
                            <h3>Pending Tasks</h3>
                            <p className='number-count'><span>{pendingTasksCount}</span> Tasks</p>
                        </div>
                        <div className='task-count completed'>
                            <FiClock size={35} color="white" className='taskIcon' />
                            <h3>Completed</h3>
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
                                            <p>Status: {task.status}</p>
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
                    
                    <div className='memberButtonContainer' onClick={handleShowMembers}>
                        <button className='memberButton'>Click here to see Team's Info</button>                    
                    </div>

                </>
            )}
        </div>
    );
}

const Members = ({ onHomeClick }) => {
    const [members] = useState([
        { id: 1, course: 'BSIT', firstname: 'Aubrey Heart', lastname: 'Arian'},
        { id: 2,course: 'BSIT', firstname: 'Clarice', lastname: 'Domingo' },
        { id: 3, course: 'BSIT', firstname: 'Dominic', lastname: 'Daculiat' },
        { id: 4, course: 'BSIT', firstname: 'Zairyl Mae', lastname: 'Patosa'},
    ]);

    useEffect(() => {
        const addInitialMembers = async () => {
            const membersCollection = collection(firestore, 'members');

            for (const member of members) {
                const memberQuery = query(membersCollection, where('id', '==', member.id));
                const querySnapshot = await getDocs(memberQuery);

                if (querySnapshot.empty) {
                    await addDoc(membersCollection, member);
                }
            }
        };

        addInitialMembers();
    }, [members]);

    return (
        <div className='members-container'>
            <Table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index}>
                            <td>{member.id}</td>
                            <td>{member.firstname}</td>
                            <td>{member.lastname}</td>
                            <td>{member.course}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className='backButtonContainer'>
                <button className='backButton' onClick={onHomeClick}>Home</button>
            </div>
        </div>
    );
};
