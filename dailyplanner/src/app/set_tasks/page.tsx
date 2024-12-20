"use client"

import { useEffect, useState } from "react";
import DisplayCard from "../components/DisplayCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);

  // Fetch tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Container for Display Cards */}
      <div className="p-6" style={{ width: "80%", margin: "0 auto" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <DisplayCard
                key={index}
                title={task.name}
                time={task.time}
                color={task.color}
              />
            ))
          ) : (
            <p className="text-gray-600">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
}