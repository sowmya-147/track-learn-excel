
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AddStudent from "./pages/AddStudent";
import AddMarks from "./pages/AddMarks";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const isAuthenticated = user && profile;
  const isTeacher = profile?.role === 'teacher';
  const isStudent = profile?.role === 'student';

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login /> : <Navigate to={isTeacher ? '/teacher' : '/student'} />} 
      />
      <Route 
        path="/teacher" 
        element={isAuthenticated && isTeacher ? <TeacherDashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/student" 
        element={isAuthenticated && isStudent ? <StudentDashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/add-student" 
        element={isAuthenticated && isTeacher ? <AddStudent /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/add-marks" 
        element={isAuthenticated && isTeacher ? <AddMarks /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/attendance" 
        element={isAuthenticated && isTeacher ? <Attendance /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/reports" 
        element={isAuthenticated && isTeacher ? <Reports /> : <Navigate to="/login" />} 
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
