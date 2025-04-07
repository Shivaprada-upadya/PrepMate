import React, { useState, useEffect } from "react";
import { fetchTasks, addTask, updateTask, deleteTask } from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDay, setEditDay] = useState("");
  const [editWeek, setEditWeek] = useState("");

  useEffect(() => {
    fetchTasks().then((response) => setTasks(response.data));
  }, []);

  const handleAddTask = () => {
    if (!title.trim() || !day.trim() || !week.trim()) return;
    const newTask = { title, day, week, completed: false };
    addTask(newTask).then((response) => {
      setTasks([...tasks, response.data]);
      setTitle("");
      setDay("");
      setWeek("");
    });
  };

  const handleToggleComplete = (task) => {
    const updated = { ...task, completed: !task.completed };
    updateTask(task.id, updated).then((response) => {
      setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
    });
  };

  const handleDelete = (id) => {
    deleteTask(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDay(task.day);
    setEditWeek(task.week);
  };

  const handleSaveEdit = (task) => {
    const updatedTask = {
      ...task,
      title: editTitle,
      day: editDay,
      week: editWeek,
    };
    updateTask(task.id, updatedTask).then((response) => {
      setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
      setEditId(null);
    });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#f2f2f2" : "#000000",
      }}
    >
      <button onClick={toggleDarkMode} style={styles.darkToggle}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 style={styles.heading}>
        <span role="img" aria-label="notebook">📒</span> Placement Prep Tracker
      </h1>

      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        />
        <button style={styles.button} onClick={handleAddTask}>Add</button>
      </div>

      <ul style={styles.taskList}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              ...styles.taskItem,
              backgroundColor: darkMode ? "#333" : "#f9f9f9",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}
            />
            {editId === task.id ? (
              <>
                <input
                  style={styles.editInput}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  style={styles.editInput}
                  value={editDay}
                  onChange={(e) => setEditDay(e.target.value)}
                />
                <input
                  style={styles.editInput}
                  value={editWeek}
                  onChange={(e) => setEditWeek(e.target.value)}
                />
                <button style={styles.saveBtn} onClick={() => handleSaveEdit(task)}>  <span></span>💾</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title} - {task.day} - {task.week}
                </span>
               <button style={styles.editBtn} onClick={() => handleEdit(task)}>✏️</button> 
              </>
            )}
            <button style={styles.deleteButton} onClick={() => handleDelete(task.id)}>
           <span></span>   ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    transition: "background-color 0.3s, color 0.3s",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  darkToggle: {
    marginBottom: "20px",
    padding: "8px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "30%",
    minWidth: "120px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: "5px",
    marginBottom: "10px",
    gap: "10px",
    flexWrap: "wrap",
  },
  taskText: {
    flex: 1,
    fontSize: "16px",
    textAlign: "left",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
  editBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
  saveBtn: {
    backgroundColor: "#2196F3",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editInput: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100px",
  },
};

export default App;
