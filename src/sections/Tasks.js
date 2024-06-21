// Task.js
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { MdDelete, MdEdit } from "react-icons/md";
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import '../config/style.css';
import empty from '../assets/Empty.png';

export default function Task({ searchTerm, taskDetails, setTaskDetails }) {
    const [showNewTask, setShowNewTask] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [filter, setFilter] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksSnapshot = await getDocs(collection(firestore, 'tasks'));
            const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTaskDetails(tasksList);
        };
        fetchTasks();
    }, [setTaskDetails]);

    const handleAddTaskClick = () => {
        setShowNewTask(true);
    };

    const handleCancel = () => {
        setShowNewTask(false);
        setEditTask(null);
    };

    const handleCreateTask = async (newTask) => {
        if (editTask !== null) {
            const taskDoc = doc(firestore, 'tasks', editTask);
            await updateDoc(taskDoc, newTask);
        } else {
            await addDoc(collection(firestore, 'tasks'), newTask);
        }
        const tasksSnapshot = await getDocs(collection(firestore, 'tasks'));
        const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTaskDetails(tasksList);
        setShowNewTask(false);
        setEditTask(null);
    };

    const handleDeleteTask = async (taskId) => {
        await deleteDoc(doc(firestore, 'tasks', taskId));
        const tasksSnapshot = await getDocs(collection(firestore, 'tasks'));
        const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTaskDetails(tasksList);
        if (selectedCategory !== 'All' && !tasksList.some(task => task.category === selectedCategory)) {
            setSelectedCategory('All');
        }
    };

    const handleEditTask = (taskId) => {
        setEditTask(taskId);
        setShowNewTask(true);
    };

    const handleToggleTaskStatus = async (taskId) => {
        const task = taskDetails.find(task => task.id === taskId);
        const taskDoc = doc(firestore, 'tasks', taskId);
        await updateDoc(taskDoc, { status: task.status === 'Pending' ? 'Completed' : 'Pending' });
        const tasksSnapshot = await getDocs(collection(firestore, 'tasks'));
        const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTaskDetails(tasksList);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'high-priority';
            case 'Medium':
                return 'medium-priority';
            case 'Low':
                return 'low-priority';
            default:
                return '';
        }
    };

    const getUniqueCategories = () => {
        const categories = taskDetails
            .map(task => task.category)
            .filter((category, index, self) => self.indexOf(category) === index && taskDetails.some(task => task.category === category));
        return ['All', ...categories];
    };

    const filteredTasks = taskDetails.filter(task => 
        (filter === 'All' || task.status === filter) &&
        (selectedCategory === 'All' || task.category === selectedCategory) &&
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
         task.member.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className='task-section'>
            <Button className="btn-addTask" type="button" onClick={handleAddTaskClick}>Add task</Button>
            {!showNewTask && (
                <>
                    {taskDetails.length > 0 ? (
                        <>
                            <div className="task-filter">
                                <select value={filter} onChange={handleFilterChange}>
                                    <option value="All">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            {getUniqueCategories().length > 1 && (
                                <div className="category-tabs">
                                    {getUniqueCategories().map((category, index) => (
                                        <button
                                            key={index}
                                            className={selectedCategory === category ? 'active' : ''}
                                            onClick={() => handleCategoryChange(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className='task'>
                                {filteredTasks.map((task, index) => (
                                    <div key={index} className="task-item">
                                        <input 
                                            type="checkbox" 
                                            checked={task.status === 'Completed'} 
                                            onChange={() => handleToggleTaskStatus(task.id)} 
                                        />
                                        <div className="task-details">
                                            <h3>{task.title}</h3>
                                            <p>{task.description}</p>
                                            <p className='red-color'>Deadline: {task.dueDate} {task.dueTime}</p>
                                            <p>Member: {task.member}</p>
                                            <div className='bottom'>
                                                <h4 className={getPriorityClass(task.priority)}>{task.priority}</h4>
                                                <p className='blue-color'>Date Created: {formatDate(task.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="task-actions">
                                            <MdEdit onClick={() => handleEditTask(task.id)} />
                                            <MdDelete onClick={() => handleDeleteTask(task.id)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='empty'>
                            <img className='empty-image' src={empty} alt="No tasks available" />
                        </div>
                    )}
                </>
            )}
            {showNewTask && <NewTask onCancel={handleCancel} onCreate={handleCreateTask} editTask={editTask !== null ? taskDetails.find(task => task.id === editTask) : null} />}
        </div>
    );
};

const NewTask = ({ onCancel, onCreate, editTask }) => {
    const [taskTitle, setTaskTitle] = useState(editTask ? editTask.title : '');
    const [taskDescription, setTaskDescription] = useState(editTask ? editTask.description : '');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(editTask ? editTask.category : '');
    const [newCategory, setNewCategory] = useState('');
    const [priority, setPriority] = useState(editTask ? editTask.priority : '');
    const [dueDate, setDueDate] = useState(editTask ? editTask.dueDate : '');
    const [dueTime, setDueTime] = useState(editTask ? editTask.dueTime : '');
    const [member, setMember] = useState(editTask ? editTask.member : '');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesSnapshot = await getDocs(collection(firestore, 'categories'));
            const categoriesList = categoriesSnapshot.docs.map(doc => doc.data().name);
            setCategories(categoriesList);
        };
        fetchCategories();
    }, []);

    const handleCreate = async () => {
        // Validation
        if (!taskTitle || !taskDescription || (!category && !newCategory) || !priority || !dueDate || !dueTime || !member) {
            setError('All fields are required.');
            return;
        }

        const newTask = {
            title: taskTitle,
            description: taskDescription,
            status: editTask ? editTask.status : 'Pending',
            deadline: new Date(`${dueDate}T${dueTime}`),
            createdAt: editTask ? editTask.createdAt : new Date().toISOString(),
            category: category || newCategory,
            priority,
            dueDate,
            dueTime,
            member,
        };
        onCreate(newTask);
    };

    const handleAddCategory = async () => {
        if (newCategory && !categories.includes(newCategory)) {
            await addDoc(collection(firestore, 'categories'), { name: newCategory });
            setCategories([...categories, newCategory]);
            setCategory(newCategory);
            setNewCategory('');
        }
    };

    const handleDeleteCategory = async () => {
        const categoryDoc = doc(firestore, 'categories', category);
        await deleteDoc(categoryDoc);
        const updatedCategories = categories.filter(cat => cat !== category);
        setCategories(updatedCategories);
        setCategory('');
    };

    const handleCategorySelect = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className="new-task">
            <div className='newTask-text'>
                <h2> Add New Task</h2>
            </div>
            {error && <div className="error">{error}</div>}

            <input 
                type="text" 
                placeholder="Enter Task Title" 
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Enter Task Description" 
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <div className="category-section">
                {category && (
                    <div className="selected-category">
                        <span className='category' style={{ fontSize: "15px" }}>Selected Category:  <p style={{ fontWeight: "600", color: "#00BF63" }}>{category}</p></span>
                    </div>
                )}
                <div className='select-delete-category'>
                    <select 
                        value={category}
                        onChange={handleCategorySelect}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {category && <Button className="delete-btn" onClick={handleDeleteCategory}>Delete</Button>}
                </div>

                <div className='new-category'>
                    <input 
                        type="text" 
                        placeholder="New Category" 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button className="add-btn" onClick={handleAddCategory}>Add</Button>
                </div>
            </div>

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <input 
                type="time" 
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
            />

            <input 
                type="text" 
                placeholder="Member Name" 
                value={member}
                onChange={(e) => setMember(e.target.value)}
            />

            <div className='btn-container'>
                <Button className="cancel-btn" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button className="createTask-btn" onClick={handleCreate}>{editTask ? 'Update' : 'Create'} Task</Button>
            </div>
        </div>
    );
};
