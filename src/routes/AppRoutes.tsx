import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import BoardPage from "../pages/BoardPages";
import { useSelector } from "react-redux";
import type { RootState } from "../stores/store";

export default function AppRoutes() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/board"
          element={isLoggedIn ? <BoardPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
