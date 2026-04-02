import { toast } from "react-hot-toast";

export const showAddToast = () => toast.success("Task added ✅");
export const showUpdateToast = () => toast("Task updated 🔄");
export const showDeleteToast = () => toast.error("Task deleted 🗑️");
export const showClearToast = () => toast("All tasks cleared 🚨");
