// useIndexedDB.js
import { useState, useEffect } from "react";

export function useIndexedDB(dbName = "TaskDB") {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore("tasks", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("status", "status", { unique: false });
      store.createIndex("createdAt", "createdAt", { unique: false });
    };

    request.onsuccess = () => setDb(request.result);
    request.onerror = () => console.error("IndexedDB failed:", request.error);
  }, [dbName]);

  const tx = (storeName, mode = "readonly") =>
    db.transaction(storeName, mode).objectStore(storeName);

  const idbRequestToPromise = (request) =>
    new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

  const createTask = async (task) => {
    const now = Date.now();
    const newTask = {
      ...task,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    const store = tx("tasks", "readwrite");
    const id = await idbRequestToPromise(store.add(newTask));
    return { ...newTask, id };
  };

  const readAllTasks = async () => {
    if (!db) return [];
    const store = tx("tasks");
    const all = await idbRequestToPromise(store.getAll());
    return all.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  };

  const updateTask = async (id, patch) => {
    const store = tx("tasks", "readwrite");
    const existing = await idbRequestToPromise(store.get(id));
    const updated = { ...existing, ...patch, updatedAt: Date.now() };
    await idbRequestToPromise(store.put(updated));
    return updated;
  };

  const deleteTask = async (id) => {
    const store = tx("tasks", "readwrite");
    await idbRequestToPromise(store.delete(id));
  };

  const clearAllTasks = async () => {
    const store = tx("tasks", "readwrite");
    await idbRequestToPromise(store.clear());
  };

  return {
    db,
    createTask,
    readAllTasks,
    updateTask,
    deleteTask,
    clearAllTasks,
  };
}
