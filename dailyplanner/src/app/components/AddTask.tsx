"use client";

import React, { useState, useEffect } from "react";

interface Task {
  name: string;
  time: string;
  color: string; // New property for the color
}

const COLORS = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFF6", "#F4FF33", "#FF8133", 
  "#33FF8E", "#8E33FF", "#FF3380", "#A1FF33", "#33F7FF", "#FF6733", "#FF3380", 
  "#33FF57", "#7B33FF", "#FF8C33", "#FF5633", "#FF5733", "#33FF57"
];

export default function AddTask({ onClose }: { onClose: () => void }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  const generateTimes = () => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedTime = `${hour.toString().padStart(2, "0")}:00 - ${(
        hour + 1
      )
        .toString()
        .padStart(2, "0")}:00`;
      times.push(formattedTime);
    }

    return times;
  };

  useEffect(() => {
    let allTimes = generateTimes();

    const storedTasks = localStorage.getItem("tasks");
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    
    // Sort tasks based on time before setting them
    parsedTasks.sort((a: Task, b: Task) => {
      const [aHour] = a.time.split(":").map(Number);
      const [bHour] = b.time.split(":").map(Number);
      return aHour - bHour;
    });

    setTasks(parsedTasks);
    setAvailableTimes(allTimes);
    setSelectedTime(allTimes[0]);
  }, []);

  // Function to add a new task with a random color
  const handleAddTask = () => {
    if (!taskName || !selectedTime) return;

    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newTask = { name: taskName, time: selectedTime, color: randomColor };

    // Sort the tasks based on the time before updating state and localStorage
    const updatedTasks = [...tasks, newTask].sort((a: Task, b: Task) => {
      const [aHour] = a.time.split(":").map(Number);
      const [bHour] = b.time.split(":").map(Number);
      return aHour - bHour;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    setTaskName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h2>

        {/* Task Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Task Name</label>
          <input
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        {/* Available Times Dropdown */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          >
            {availableTimes.length > 0 ? (
              availableTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))
            ) : (
              <option value="">No available times</option>
            )}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}