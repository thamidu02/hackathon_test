import { useState, useEffect } from "react";
import axios from "axios";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH ALL TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks");
    } finally {
      setFetchLoading(false);
    }
  };

  // CREATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        taskName,
        description,
        status,
      });

      // Add new task to the list
      setTasks([response.data, ...tasks]);
      
      // Clear form
      setTaskName("");
      setDescription("");
      setStatus("pending");
      
    } catch (error) {
      console.error("Error creating task:", error);
      setError(error.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      
      // Remove the deleted task from the list
      setTasks(tasks.filter((task) => task._id !== id));
      
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  // GET TASK BY ID (View Single Task)
// GET TASK BY ID (View Single Task)
const viewTaskById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
    const task = response.data;
    
    // Check if task data exists
    if (task) {
      alert(
        ` TASK DETAILS\n\n` +
        `Task: ${task.taskName || 'N/A'}\n` +
        `Description: ${task.description || 'N/A'}\n` +
        `Status: ${task.status || 'N/A'}\n` +
        `Created: ${task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}\n` +
        `ID: ${task._id}`
      );
    } else {
      alert("Task not found");
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    if (error.response?.status === 404) {
      alert("Task not found");
    } else {
      alert("Failed to fetch task details");
    }
  }
};

  if (fetchLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="task-dashboard">
      {/* Error Message */}
      {error && <div className="error">{error}</div>}

      {/* TASK FORM SECTION */}
      <section className="card">
        <h2>Add a Task</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            disabled={loading}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
            rows="3"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Add Task"}
          </button>
        </form>
      </section>

      {/* TASK LIST SECTION */}
      <section className="tasks-section">
        <div className="section-header">
          <h2>All Tasks</h2>
          <span>{tasks.length}</span>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Create one!</p>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task._id} className="task-item">
                <div className="task-header">
                  <h3>{task.taskName}</h3>
                  <span className={`status-badge ${task.status}`}>
                    {task.status}
                  </span>
                </div>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span>
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  <div className="task-actions">
                    <button 
                      className="view-btn"
                      onClick={() => viewTaskById(task._id)}
                    >
                      View
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TaskDashboard;