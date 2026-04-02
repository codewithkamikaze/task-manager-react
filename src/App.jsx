import { TaskProvider } from "./context/TaskProvider";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SeedTasks from "./components/SeedTasks";
import ToastProvider from "./components/ToastProvider";

import { useState } from "react";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <TaskProvider>
      <ToastProvider />
      <div className="max-w-5xl mx-auto p-4 bg-white/5 border-white/10 rounded-[18px]">
        <h1 className="text-lg font-bold mb-4">Task Manager (IndexedDB)</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[45%]">
            <TaskForm />
          </div>
          <div className="lg:w-[55%]">
            <div className="flex justify-end mb-2">
              <SeedTasks />
            </div>
            <TaskList
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}
