import { useState, useEffect } from "react";

export default function TaskList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div className="card">
      <h3>📝 Focus Tasks</h3>
      <div className="task-input">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What will you focus on?"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((t, i) => (
        <p
          key={i}
          onClick={() => toggleTask(i)}
          className={t.done ? "done" : ""}
        >
          {t.done ? "✅" : "⬜"} {t.text}
        </p>
      ))}
    </div>
  );
}
