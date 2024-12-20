"use client"; // This is necessary for hooks in the App Router

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddTask from "./AddTask";

export default function Navbar() {
  const [toggleAdd, SetToggleAdd] = useState(false);
  const pathname = usePathname();

  const toggleAddState = () => {
    SetToggleAdd(!toggleAdd);
  };

  const addButton = () => {
    return (
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow transition-all duration-300"
        onClick={() => toggleAddState()}
      >
        Add Task
      </button>
    );
  };

  const deleteAllTasks = () => {
    localStorage.removeItem("tasks");
    alert("All tasks have been deleted!");
  };

  const deleteAllButton = () => {
    return (
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow transition-all duration-300"
        onClick={deleteAllTasks}
      >
        Delete All Tasks
      </button>
    );
  };

  return (
    <nav className="bg-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-wide">Daily Planner</h1>
          </div>
          <div className="flex space-x-4">
            {pathname === "/set_tasks" ? (
              <>
                {addButton()}
                {deleteAllButton()}
              </>
            ) : null}
          </div>
        </div>
      </div>
      {toggleAdd && <AddTask onClose={() => toggleAddState()} />}
    </nav>
  );
}