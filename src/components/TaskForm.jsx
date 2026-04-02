import { useState, useEffect, useCallback } from "react";

export default function TaskForm({ addTask, clearTasks }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  const handleAdd = useCallback(async () => {
    if (title.trim().length < 3)
      return setError("❌ Title must be at least 3 characters");
    await addTask(title.trim(), desc.trim());
    setTitle("");
    setDesc("");
    setError("");
  }, [title, desc, addTask]);

  // ✅ Ctrl+Enter / Cmd+Enter shortcut
  useEffect(() => {
    const handleKey = (e) => {
      const typing =
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA";

      if (typing && (e.ctrlKey || e.metaKey) && e.key === "Enter") {
        handleAdd();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleAdd]);

  const handleReset = () => {
    setTitle("");
    setDesc("");
    setError("");
  };

  return (
    <div className="bg-white/6 p-4 rounded-xl border border-white/12 mb-4 h-full flex flex-col">
      <h2 className="font-bold text-lg mb-2">Add New Task</h2>

      {error && <div className="bg-red-600/20 p-2 rounded mb-2">{error}</div>}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 rounded border border-white/16 bg-black/25 mb-2"
      />

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="w-full p-2 rounded border border-white/16 bg-black/25 mb-2 flex-1"
      />

      <div className="flex gap-2 justify-end mt-auto">
        <button
          className="bg-white/12 px-4 py-2 rounded hover:ring-2 ring-blue-400 transition-all duration-200"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          className="bg-blue-600 px-4 py-2 rounded hover:scale-95 transition-transform duration-150"
          onClick={handleAdd}
        >
          Add Task
        </button>

        <button
          className="bg-red-600 px-4 py-2 rounded hover:scale-95 transition-transform duration-150"
          onClick={clearTasks}
        >
          Clear All
        </button>
      </div>

      <div className="mt-3 text-sm text-white/60">
        Tip: Press <span className="font-semibold">Ctrl + Enter</span>{" "}
        (Windows/Linux) or <span className="font-semibold">Cmd + Enter</span>{" "}
        (Mac) to add quickly.
      </div>

      <div className="mt-1 text-sm text-white/40">
        Pending tasks are yellow. Mark as done to turn green. Keep titles short
        and sweet!
      </div>
    </div>
  );
}
