import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../features/tasks/taskSlice";
import TaskCard from "./TaskCard";

interface ColumnProps {
  id: Task["status"];
  title: string;
  tasks: Task[];
  onAddTask: (status: Task["status"]) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export default function Column({
  id,
  title,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-w-[16rem] max-w-sm p-4 rounded-2xl flex-shrink-0 transition-colors ${
        isOver ? "bg-blue-100" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">{title}</h2>
        <button
          onClick={() => onAddTask(id)}
          className="text-sm px-2 py-1 bg-blue-500 text-white rounded"
        >
          +
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
