# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

---

# Kraftbase Kanban – Frontend Engineer Assignment

## 🚀 Live Demo

[Vercel Deployment](https://kraftbase-steel.vercel.app)

## 📂 Repository

[GitHub Source Code](https://github.com/Kartikay123/Kraftbase)

---

## 📖 Overview

This project is a **Kanban-style task management application** built as part of the Frontend Engineer assignment.

- Users can **log in** to access the board.
- Tasks are organized into different statuses (e.g., To Do, In Progress, Done).
- Implemented **drag-and-drop functionality** for seamless task movement.
- Protected routes ensure that only authenticated users can access the board.

---

## 🛠️ Tech Stack

- **React + TypeScript** – Frontend framework
- **Vite** – Build tool for fast bundling
- **Tailwind CSS** – Styling
- **@dnd-kit** – Drag-and-drop library
- **Vercel** – Deployment platform
- **GitHub Pages** – Static hosting (for backup deployment)

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Kartikay123/Kraftbase.git
   cd Kraftbase
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

---

## 🔒 Authentication

- The app starts at `/login`.
- A simple login flow is implemented.
- `/board` is a protected route → requires login.

---

## 📝 Features Implemented

- ✅ Login page (entry point)
- ✅ Protected Board page
- ✅ Task creation and deletion
- ✅ Drag-and-drop task reordering
- ✅ Responsive UI with Tailwind
- ✅ Deployed on Vercel

---

## 💡 Approach

I approached the assignment by focusing on:

1. **Authentication first** → Securing `/board` behind a login check.
2. **Core Kanban functionality** → Task creation, listing, and drag-and-drop.
3. **Clean UI/UX** → Tailwind CSS for responsive design.
4. **Deployment** → Hosted on Vercel with GitHub integration for CI/CD.

---
