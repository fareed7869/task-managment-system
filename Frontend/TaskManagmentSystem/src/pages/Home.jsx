// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../services/api";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const taskList = await getTasks();
    setTasks(taskList);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Task Management System
        </h1>

        <div className="overflow-x-auto">
          <div className="bg-gray-800 rounded-lg shadow-lg">
            <table className="min-w-full table-fixed">
              <thead>
                <tr className="text-white text-center">
                  <th className="py-3 border-b border-gray-600 w-5/12">
                    Title
                  </th>
                  <th className="py-3 border-b border-gray-600 w-3/12">
                    Status
                  </th>
                  <th className="py-3 border-b border-gray-600 w-3/12">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`text-white text-center transition duration-300 ${
                      task.status === "completed"
                        ? "bg-green-600"
                        : task.status === "in-progress"
                        ? "bg-blue-600"
                        : "bg-gray-500"
                    }`}
                  >
                    <td className="py-2 border-b border-gray-600">
                      {task.title}
                    </td>
                    <td className="py-2 border-b border-gray-600">
                      {task.status}
                    </td>
                    <td className="py-2 border-b border-gray-600">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleView(task.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleUpdate(task.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
