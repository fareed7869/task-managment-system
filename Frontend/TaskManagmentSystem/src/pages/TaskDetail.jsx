// Task Details Page
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask } from '../services/api';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            const taskData = await getTask(id);
            setTask(taskData);
        };
        fetchTask();
    }, [id]);

    if (!task) return <div className="text-white text-center">Loading...</div>;

    return (
        <div className="bg-gray-900 min-h-screen py-10 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-4xl font-extrabold text-center text-gray-300 mb-6 text-decoration-line: underline">Task-Details</h1>
                <p className="text-gray-300 mb-2 text-lg"><strong>Title:</strong> {task.title}</p>
                <p className="text-gray-300 mb-2 text-lg"><strong>Status:</strong> {task.status}</p>
                <p className="text-gray-300 mb-2 text-lg"><strong>Description:</strong> {task.description}</p>
                <p className="text-gray-300 mb-2 "><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                <p className="text-gray-300 mb-4 "><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white mt-4 px-5 py-1.5 rounded hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
