import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", week: 1, day: 1 });
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/api/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      toast.warning("Please enter a task title");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/tasks", {
        ...newTask,
        completed: false,
      });
      toast.success("Task added!");
      setNewTask({ title: "", week: 1, day: 1 });
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`);
    toast.error("Task deleted");
    fetchTasks();
  };

  const handleComplete = async (task) => {
    await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
    toast.info("Task status updated");
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setNewTask({ title: task.title, week: task.week, day: task.day });
  };

  const handleUpdate = async () => {
    if (!newTask.title.trim()) {
      toast.warning("Title cannot be empty");
      return;
    }

    await axios.put(`http://localhost:8080/api/tasks/${editId}`, {
      ...newTask,
      completed: false,
    });

    toast.success("Task updated");
    setEditId(null);
    setNewTask({ title: "", week: 1, day: 1 });
    fetchTasks();
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
      

    <div className={darkMode ? "app dark-mode" : "app"}>
      <h1>🚀 Placement Prep Tracker</h1>
      
      <div className="form">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Week"
          min="1"
          value={newTask.week}
          onChange={(e) =>
            setNewTask({ ...newTask, week: parseInt(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Day"
          min="1"
          value={newTask.day}
          onChange={(e) =>
            setNewTask({ ...newTask, day: parseInt(e.target.value) })
          }
        />
        {editId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAddTask}>Add Task</button>
        )}
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <h3>{task.title}</h3>
            <p>
              Week {task.week}, Day {task.day}
            </p>
            <div className="actions">
              <button onClick={() => handleComplete(task)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
      <footer className="footer">
  <p>© {new Date().getFullYear()} <strong>Shivaprada Upadya</strong> · All rights reserved.</p>
  <p>
    <a
      href="https://github.com/ShivapradaUpadya"
      target="_blank"
      rel="noopener noreferrer"
      className="github-link"
    >
      <FaGithub style={{ marginRight: "6px", verticalAlign: "middle" }} />
      Visit my GitHub Profile
    </a>
  </p>
</footer>


    </div>
   
  );
}

export default App;
