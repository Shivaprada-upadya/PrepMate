// src/components/TaskForm.js
import React, { useState } from 'react';
import { addTask } from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !day.trim() || !week.trim()) return;

    const task = {
      title: title,
      day: day,
      week: week,
      completed: false
    };

    try {
      await addTask(task);
      toast.success("Task added!");
      setTitle("");
      setDay("");
      setWeek("");
      onTaskAdded(); // refresh list
    } catch (error) {
      //console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Enter day (e.g., Day 1)"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Enter week (e.g., Week 1)"
        value={week}
        onChange={(e) => setWeek(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
