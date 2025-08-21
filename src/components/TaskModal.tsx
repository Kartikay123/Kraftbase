// src/components/TaskModal.tsx
import { useState, useEffect } from "react";
import type { Task } from "../features/tasks/taskSlice";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, "id">, id?: string) => void;
  task?: Task; // for editing
}

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  task,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<Task["severity"]>("Low");
  const [label, setLabel] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (task) {
        // Editing existing task → prefill
        setTitle(task.title);
        setSeverity(task.severity);
        setLabel(task.label);
        setScore(task.score);
      } else {
        // Adding new task → reset fields
        setTitle("");
        setSeverity("Low");
        setLabel("");
        setScore(0);
      }
    }
  }, [task, isOpen]); // 🔑 reset also when modal is reopened

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4">
          {task ? "Edit Task" : "New Task"}
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 mb-3 rounded"
        />

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Task["severity"])}
          className="w-full border p-2 mb-3 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          placeholder="Score"
          className="w-full border p-2 mb-3 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 rounded">
            Cancel
          </button>

          <button
            onClick={() =>
              onSave(
                {
                  title,
                  severity,
                  label,
                  score,
                  status: task?.status ?? "Draft",
                  date: task?.date ?? new Date().toISOString(),
                },
                task?.id
              )
            }
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
