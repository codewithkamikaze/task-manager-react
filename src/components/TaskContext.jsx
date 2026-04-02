// import { createContext, useContext, useState, useEffect } from "react";
// import { useIndexedDB } from "../useIndexedDB";
// import {
//   showAddToast,
//   showUpdateToast,
//   showDeleteToast,
//   showClearToast,
// } from "./toast";

// // 1️⃣ إنشاء الـ context
// const TaskContext = createContext();

// // 2️⃣ Hook مخصص للوصول للـ context
// export const useTasks = () => useContext(TaskContext);

// // 3️⃣ Provider يحتوي على جميع state و actions
// export default function TaskProvider({ children }) {
//   const {
//     db,
//     createTask,
//     readAllTasks,
//     updateTask,
//     deleteTask,
//     clearAllTasks,
//   } = useIndexedDB();
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");

//   // جلب كل المهمات عند جاهزية DB
//   useEffect(() => {
//     if (!db) return;
//     async function init() {
//       const all = await readAllTasks();
//       setTasks(all);
//     }
//     init();
//   }, [db]);

//   // Actions
//   const addTaskHandler = async (title, description) => {
//     if (!db) return;
//     const t = await createTask({ title, description });
//     setTasks([t, ...tasks]);
//     showAddToast();
//   };

//   const toggleTaskHandler = async (id) => {
//     if (!db) return;
//     const t = tasks.find((t) => t.id === id);
//     if (!t) return;
//     const newStatus = t.status === "done" ? "pending" : "done";
//     await updateTask(id, { status: newStatus });
//     setTasks(
//       tasks.map((ts) => (ts.id === id ? { ...ts, status: newStatus } : ts)),
//     );
//     showUpdateToast();
//   };

//   const removeTaskHandler = async (id) => {
//     if (!db) return;
//     if (!confirm("Delete this task?")) return;
//     await deleteTask(id);
//     setTasks(tasks.filter((t) => t.id !== id));
//     showDeleteToast();
//   };

//   const clearTasksHandler = async () => {
//     if (!db) return;
//     if (!confirm("Clear all tasks?")) return;
//     await clearAllTasks();
//     setTasks([]);
//     showClearToast();
//   };

//   return (
//     <TaskContext.Provider
//       value={{
//         db,
//         tasks,
//         filter,
//         setFilter,
//         search,
//         setSearch,
//         addTask: addTaskHandler,
//         toggleTask: toggleTaskHandler,
//         removeTask: removeTaskHandler,
//         clearTasks: clearTasksHandler,
//       }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// }
