// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="border p-3 rounded mb-2 bg-white shadow">
          {task.title}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
