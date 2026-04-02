import { useState, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import {
  openDB,
  readAllTasks,
  createTask,
  updateTask,
  deleteTask,
  clearAllTasks,
} from "../db";
import {
  showAddToast,
  showUpdateToast,
  showDeleteToast,
  showClearToast,
} from "../components/toast";

export function TaskProvider({ children }) {
  const [db, setDb] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function init() {
      const database = await openDB();
      setDb(database);
      const allTasks = await readAllTasks(database);
      setTasks(allTasks);
    }
    init();
  }, []);

  const addTask = async (title, description) => {
    if (!db) return;
    const t = await createTask(db, { title, description });
    setTasks((prev) => [t, ...prev]);
    showAddToast();
  };

  const toggleTask = async (id) => {
    if (!db) return;
    const t = tasks.find((t) => t.id === id);
    if (!t) return;
    const newStatus = t.status === "done" ? "pending" : "done";
    await updateTask(db, id, { status: newStatus });
    setTasks((prev) =>
      prev.map((ts) => (ts.id === id ? { ...ts, status: newStatus } : ts)),
    );
    showUpdateToast();
  };

  const removeTask = async (id) => {
    if (!db) return;
    if (!confirm("Delete this task?")) return;
    await deleteTask(db, id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showDeleteToast();
  };

  const clearTasks = async () => {
    if (!db) return;
    if (!confirm("Clear all tasks?")) return;
    await clearAllTasks(db);
    setTasks([]);
    showClearToast();
  };

  return (
    <TaskContext.Provider
      value={{
        db,
        tasks,
        addTask,
        toggleTask,
        removeTask,
        clearTasks,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
