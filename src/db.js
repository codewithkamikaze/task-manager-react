// src/db.js
export async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("TaskDB", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore("tasks", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("status", "status", { unique: false });
      store.createIndex("createdAt", "createdAt", { unique: false });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error("Failed to open IndexedDB"));
  });
}

export function tx(db, storeName, mode = "readonly") {
  return db.transaction(storeName, mode).objectStore(storeName);
}

export function idbRequestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error("IndexedDB request failed"));
  });
}

export async function readAllTasks(db) {
  const store = tx(db, "tasks", "readonly");
  const all = await idbRequestToPromise(store.getAll());
  all.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  return all;
}

export async function createTask(db, { title, description }) {
  const now = Date.now();
  const task = {
    title,
    description,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  const store = tx(db, "tasks", "readwrite");
  const id = await idbRequestToPromise(store.add(task));
  return { ...task, id };
}

export async function updateTask(db, id, patch) {
  const store = tx(db, "tasks", "readwrite");
  const existing = await idbRequestToPromise(store.get(id));
  if (!existing) throw new Error("Task not found");
  const updated = { ...existing, ...patch, updatedAt: Date.now() };
  await idbRequestToPromise(store.put(updated));
  return updated;
}

export async function deleteTask(db, id) {
  const store = tx(db, "tasks", "readwrite");
  await idbRequestToPromise(store.delete(id));
}

export async function clearAllTasks(db) {
  const store = tx(db, "tasks", "readwrite");
  await idbRequestToPromise(store.clear());
}
