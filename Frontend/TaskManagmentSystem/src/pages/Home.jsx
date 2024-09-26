// Home Page
import React, { useState, useEffect } from "react";
import { getTasks, deleteTask, searchTasks, filteredTaskStatus } from "../services/api";
import { useNavigate } from "react-router-dom";
import Pagination from '../components/Pagination';
import { debounce } from 'lodash';

const Home = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStatus, setFilteredStatus] = useState(null);

    useEffect(() => {
        if (filteredStatus) {
            fetchFilteredTasks(currentPage);
        } else {
            fetchTasks(currentPage);
        }
    }, [currentPage, filteredStatus]);

    const fetchTasks = async (page) => {
        setLoading(true);
        const taskData = await getTasks(page);
        setTasks(taskData.tasks);
        setTotalPages(taskData.totalPages);
        setLoading(false);
    };

    const fetchFilteredTasks = async (page) => {
        setLoading(true);
        const taskData = await filteredTaskStatus(filteredStatus, page);
        setTasks(taskData.tasks);
        setTotalPages(taskData.totalPages);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks(currentPage);
    };

    const handleView = (id) => {
        navigate(`/tasks/${id}`);
    };

    const handleUpdate = (id) => {
        navigate(`/updateTask/${id}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (filteredStatus) {
            fetchFilteredTasks(page);
        } else {
            fetchTasks(page);
        }
    };

    const debouncedSearch = debounce(async (query) => {
        if (query) {
            const taskData = await searchTasks(query, currentPage);
            setTasks(taskData.tasks);
            setTotalPages(taskData.totalPages);
        } else {
            fetchTasks(currentPage);
        }
    }, 300, { trailing: true });

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilteredStatus(value);
    };

    return (
        <div className="bg-gray-900 min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-white mb-10 tracking-tight">
              Task Management System
            </h1>
      
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0">
              <button
                onClick={() => navigate('/addTask')}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out"
              >
                Add New Task
              </button>

              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Tasks by title...."
                className="flex-grow max-w-xs px-5 py-3 border border-gray-400 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
    
              <select
                onChange={handleFilterChange}
                className="bg-gray-800 text-white font-semibold px-6 py-3 border border-gray-600 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                <option value="">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {loading ? (
              <div className="text-white text-center">Loading...</div>
            ) : (
              <div className="overflow-x-auto ">
                <div className="bg-gray-800 rounded-lg shadow-lg">
                  <table className="min-w-full table-fixed">
                    <thead>
                      <tr className="text-white text-center">
                        <th className="py-3 border-b border-gray-600 w-2/12">#</th>
                        <th className="py-3 border-b border-gray-600 w-3/12">Title</th>
                        <th className="py-3 border-b border-gray-600 w-3/12">Status</th>
                        <th className="py-3 border-b border-gray-600 w-4/12">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr
                          key={task.id}
                          className={`text-white text-center transition duration-300 ${task.status === "completed"
                            ? "bg-green-600"
                            : task.status === "in-progress"
                              ? "bg-blue-600"
                              : "bg-gray-500"
                            }`}
                        >
                          <td className="py-2 border-b border-gray-600">{(currentPage - 1) * 5 + index + 1}</td>
                          <td className="py-2 border-b border-gray-600">{task.title}</td>
                          <td className="py-2 border-b border-gray-600">{task.status}</td>
                          <td className="py-2 border-b border-gray-600">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleView(task.id)}
                                className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition duration-300"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleUpdate(task.id)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition duration-300"
                              >
                                Update
                              </button>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
      
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
              </div>
            )}
          </div>
        </div>
      );
      
};

export default Home;
