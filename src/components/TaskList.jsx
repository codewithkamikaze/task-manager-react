import { useContext } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../context/TaskContext";

export default function TaskList({ filter, setFilter, search, setSearch }) {
  const { tasks } = useContext(TaskContext);

  const filters = ["all", "pending", "done"];

  const visible = tasks.filter((t) => {
    const matchFilter = filter === "all" ? true : t.status === filter;
    const matchSearch = !search
      ? true
      : t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <div>
      <div className="flex justify-between mb-2 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-br-md border border-white/14 text-sm transition-all duration-200 ${
                filter === f
                  ? "ring-2 ring-blue-400"
                  : "bg-white/12 hover:ring-2 hover:ring-blue-400"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="p-2 rounded border border-white/16 bg-black/25 min-w-72"
        />
      </div>

      <div className="text-sm text-white/70 mb-2">
        {visible.length} shown • Total: {total} • Pending: {pending} • Done:{" "}
        {done}
      </div>

      {visible.length === 0 && (
        <div className="border border-white/18 rounded p-4 text-white/50">
          No tasks match your filter/search.
        </div>
      )}

      <div className="grid gap-3">
        {visible.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
