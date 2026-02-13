import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import RegisterPage from "./pages/register";
import { LoginPage } from "./pages/login";
import DashboardPage from "./pages/dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="dashboard"
          element={
            <>
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
