
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AddStudent from "./pages/AddStudent";
import AddMarks from "./pages/AddMarks";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface AuthContextType {
  user: { email: string; role: 'student' | 'teacher'; name: string } | null;
  login: (email: string, password: string, role: 'student' | 'teacher') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const App = () => {
  const [user, setUser] = useState<{ email: string; role: 'student' | 'teacher'; name: string } | null>(null);

  const login = (email: string, password: string, role: 'student' | 'teacher') => {
    // Mock authentication - in real app this would be an API call
    const name = role === 'teacher' ? 'Ms. Johnson' : 'John Smith';
    setUser({ email, role, name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={user ? <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} /> : <Login />} />
              <Route path="/teacher" element={user?.role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" />} />
              <Route path="/student" element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} />
              <Route path="/add-student" element={user?.role === 'teacher' ? <AddStudent /> : <Navigate to="/login" />} />
              <Route path="/add-marks" element={user?.role === 'teacher' ? <AddMarks /> : <Navigate to="/login" />} />
              <Route path="/attendance" element={user?.role === 'teacher' ? <Attendance /> : <Navigate to="/login" />} />
              <Route path="/reports" element={user?.role === 'teacher' ? <Reports /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
