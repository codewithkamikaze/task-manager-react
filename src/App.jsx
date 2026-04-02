import { useEffect, useState } from "react";
import {
  openDB,
  readAllTasks,
  createTask,
  updateTask,
  deleteTask,
  clearAllTasks,
} from "./db";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ToastProvider from "./components/ToastProvider";
import {
  showAddToast,
  showUpdateToast,
  showDeleteToast,
  showClearToast,
} from "./components/toast";

import SeedTasks from "./components/SeedTasks";

export default function App() {
  const [db, setDb] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
    setTasks([t, ...tasks]);
    showAddToast();
  };

  const toggleTask = async (id) => {
    if (!db) return;
    const t = tasks.find((t) => t.id === id);
    if (!t) return;
    const newStatus = t.status === "done" ? "pending" : "done";
    await updateTask(db, id, { status: newStatus });
    setTasks(
      tasks.map((ts) => (ts.id === id ? { ...ts, status: newStatus } : ts)),
    );
    showUpdateToast();
  };

  const removeTask = async (id) => {
    if (!db) return;
    if (!confirm("Delete this task?")) return;
    await deleteTask(db, id);
    setTasks(tasks.filter((t) => t.id !== id));
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
    <>
      <ToastProvider />

      <div className="max-w-5xl mx-auto p-4 bg-white/5 border-white/10 rounded-[18px]">
        <h1 className="text-lg font-bold mb-4">Task Manager (IndexedDB)</h1>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left: Form */}
          <div className="lg:w-[45%]">
            <TaskForm addTask={addTask} clearTasks={clearTasks} />
          </div>
          {/* Right: Task list */}
          <div className="lg:w-[55%]">
            <div className="flex justify-end mb-2">
              <SeedTasks db={db} setTasks={setTasks} tasks={tasks} />
            </div>
            <TaskList
              tasks={tasks}
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
              toggleTask={toggleTask}
              removeTask={removeTask}
            />
          </div>
        </div>
      </div>
    </>
  );
}
