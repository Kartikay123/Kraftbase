import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../stores/store";
import { logout } from "../features/auth/authSlice";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCorners, type DragEndEvent } from "@dnd-kit/core";
import TaskToolBar from "../components/TaskToolBar";
import {
  addTask,
  editTask,
  deleteTask,
  moveTask,
  type Task,
} from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";

export default function BoardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLabel, setFilterLabel] = useState("");
  const [sortBy, setSortBy] = useState<"dateAsc" | "dateDesc">("dateAsc");

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState<Task | undefined>();
  const [defaultStatus, setDefaultStatus] = useState<Task["status"]>("Draft");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) => (filterLabel ? task.label === filterLabel : true))
    .sort((a, b) =>
      sortBy === "dateAsc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(
        moveTask({
          id: active.id as string,
          newStatus: over.id as Task["status"],
        })
      );
    }
  };

  const handleSave = (taskData: Omit<Task, "id">, id?: string) => {
    if (id) {
      dispatch(editTask({ ...taskData, id }));
    } else {
      dispatch(addTask({ ...taskData, id: uuid(), status: defaultStatus }));
    }
    setModalOpen(false);
  };

  // ✅ New handlers for edit and delete
  const handleEditTask = (task: Task) => {
    setEditTaskData(task);
    setDefaultStatus(task.status);
    setModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const statuses: { key: Task["status"]; label: string }[] = [
    { key: "Draft", label: "Draft" },
    { key: "Unsolved", label: "Unsolved" },
    { key: "Under Review", label: "Under Review" },
    { key: "Solved", label: "Solved" },
    { key: "Needs Attention", label: "Needs Attention" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <TaskToolBar
        labels={[...new Set(tasks.map((t) => t.label))]}
        onSearch={setSearchQuery}
        onFilter={setFilterLabel}
        onSort={setSortBy}
      />

      {/* Board */}
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full overflow-x-hidden">
          {statuses.map((status) => (
            <Column
              key={status.key}
              id={status.key}
              title={status.label}
              tasks={filteredTasks.filter((t) => t.status === status.key)}
              onAddTask={(statusKey) => {
                setDefaultStatus(statusKey);
                setEditTaskData(undefined);
                setModalOpen(true);
              }}
              onEditTask={handleEditTask} // ✅ pass edit handler
              onDeleteTask={handleDeleteTask} // ✅ pass delete handler
            />
          ))}
        </div>
      </DndContext>

      {/* Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        task={editTaskData}
      />
    </div>
  );
}
