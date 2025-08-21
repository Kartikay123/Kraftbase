import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  label: string;
  score: number;
  status: "Draft" | "Unsolved" | "Under Review" | "Solved" | "Needs Attention";
  date: string; // ✅ added date field
};

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "SQL Injection Vulnerability",
      severity: "High",
      label: "Backend",
      score: 90,
      status: "Unsolved",
      date: new Date("2025-08-01").toISOString(),
    },
    {
      id: "2",
      title: "XSS in Login Page",
      severity: "Critical",
      label: "Frontend",
      score: 120,
      status: "Draft",
      date: new Date("2025-08-05").toISOString(),
    },
    {
      id: "3",
      title: "Weak Password Policy",
      severity: "Medium",
      label: "Security",
      score: 40,
      status: "Needs Attention",
      date: new Date("2025-08-10").toISOString(),
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push({
        ...action.payload,
        date: action.payload.date || new Date().toISOString(), // ✅ ensure date exists
      });
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          date: new Date().toISOString(), // ✅ update date on edit
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    moveTask: (
      state,
      action: PayloadAction<{ id: string; newStatus: Task["status"] }>
    ) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = newStatus;
        task.date = new Date().toISOString(); // ✅ update date when status changes
      }
    },
  },
});

export const { addTask, editTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
