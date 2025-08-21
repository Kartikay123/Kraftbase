import type { Task } from "../features/tasks/taskSlice";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-3 bg-white rounded-lg shadow cursor-move flex flex-col gap-2"
    >
      {/* Drag handle area - only this part activates dragging */}
      <div {...listeners} {...attributes} className="flex-grow">
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.label}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="px-2 py-1 text-sm bg-yellow-400 rounded"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
