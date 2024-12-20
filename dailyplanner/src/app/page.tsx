"use client";

import { useEffect, useState } from "react";
import TaskBlock from "./components/TaskBlock";

export default function DailyPlanner() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<number[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);

      // Calculate start and end hours
      const hours = parsedTasks.map((task: any) =>
        parseInt(task.time.split(":")[0], 10)
      );
      const minHour = Math.min(...hours);
      const maxHour = Math.max(...hours);

      setTimeRange(
        Array.from({ length: maxHour - minHour + 1 }, (_, i) => minHour + i)
      );
      setTasks(parsedTasks);
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-6 w-full h-screen bg-white">
      {/* Scrollable Container */}
      <div className="w-4/5 overflow-x-auto">
        {/* Time Header */}
        <div
          className="grid border-b border-gray-300 text-center font-bold bg-white"
          style={{
            gridTemplateColumns: `repeat(${timeRange.length}, 150px)`,
          }}
        >
          {timeRange.map((hour) => (
            <div key={hour} className="p-2">
              {hour}:00
            </div>
          ))}
        </div>

        {/* Tasks Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${timeRange.length}, 150px)`,
            gridTemplateRows: "repeat(60, 20px)", // Split day into 10-minute intervals
          }}
        >
          {tasks.map((task, index) => (
            <TaskBlock
              key={index}
              task={task}
              startHour={timeRange[0] || 0}
              timeRange={timeRange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}