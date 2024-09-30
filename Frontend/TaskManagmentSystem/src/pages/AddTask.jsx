//Add Task Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/api';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Title is required');
            setTimeout(() => {
                setError(null);
            }, 1500);
        }

        try {
            setLoading(true);
            await createTask({ title, description, status });
            navigate('/');
        } catch (err) {
            setError('Failed to add task.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen py-10 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-extrabold text-center text-white mb-8">Add New Task</h1>

                {error && (
                    <div className="bg-red-500 text-white text-center py-2 mb-4 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                            Task Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Task Description
                        </label>
                        <textarea
                            id="description"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                            Task Status
                        </label>
                        <select
                            id="status"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                        >
                            {loading ? 'Submitting...' : 'Add Task'}

                        </button>
                        <button
                            type="button"
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
