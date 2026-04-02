import { createTask } from "../db";

export default function SeedTasks({ db, setTasks, tasks }) {
  const handleSeed = async () => {
    if (!db) return;

    if (tasks.length > 0) {
      alert("Tasks already exist");
      return;
    }

    const samples = [
      {
        title: "Learn React",
        description: "Hooks + Components",
      },
      {
        title: "Build Task Manager",
        description: "Using IndexedDB",
      },
      {
        title: "Go to gym",
        description: "Leg day 💪",
      },
    ];

    for (const s of samples) {
      const created = await createTask(db, s);
      setTasks((prev) => [created, ...prev]);
    }
  };

  return (
    <button onClick={handleSeed} className="bg-blue-500 px-3 py-2 rounded-lg">
      Seed Tasks
    </button>
  );
}
