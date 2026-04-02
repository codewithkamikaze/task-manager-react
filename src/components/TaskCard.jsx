// src/TaskCard.jsx
export default function TaskCard({ task, toggleTask, removeTask }) {
  const isDone = task.status === "done";
  const bg = isDone
    ? "bg-green-400/12 border-green-400/28"
    : "bg-yellow-400/14 border-yellow-400/30";
  return (
    <div
      className={`p-3 rounded-xl border ${bg} flex justify-between items-start`}
    >
      <div>
        <h3 className="font-bold mb-1">{task.title}</h3>
        <p className="mb-1">{task.description || "—"}</p>
        <div className="flex gap-2 flex-wrap text-xs">
          <span className="px-2 py-0.5 rounded-full border border-white/14">{`#${task.id}`}</span>
          <span className="px-2 py-0.5 rounded-full border border-white/14">
            {isDone ? "Done" : "Pending"}
          </span>
          <span className="px-2 py-0.5 rounded-full border border-white/14">
            {new Date(task.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => toggleTask(task.id)}
          className="px-2 py-1 text-sm rounded bg-white/12 hover:ring-2 ring-blue-400 transition-all duration-200"
        >
          {isDone ? "Mark Pending ↩️" : "Mark Done ✅"}
        </button>
        <button
          onClick={() => removeTask(task.id)}
          className="px-2 py-1 text-sm rounded bg-red-600 hover:scale-95 transition-transform duration-150"
        >
          Delete 🗑️
        </button>
      </div>
    </div>
  );
}
