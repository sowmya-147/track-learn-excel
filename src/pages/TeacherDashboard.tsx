
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useStudents } from "../hooks/useStudents";
import { useMarks } from "../hooks/useMarks";
import { useAttendance } from "../hooks/useAttendance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Calendar, TrendingUp, UserPlus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const { data: students = [] } = useStudents();
  const { data: allMarks = [] } = useMarks();
  const { data: attendanceRecords = [] } = useAttendance();

  // Calculate statistics
  const totalStudents = students.length;
  const averageMarks = allMarks.length > 0 
    ? (allMarks.reduce((sum, mark) => sum + (mark.marks_obtained / mark.max_marks * 100), 0) / allMarks.length).toFixed(1)
    : 0;
  
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceRecords.filter(record => record.date === today);
  const presentToday = todayAttendance.filter(record => record.status).length;
  const attendancePercentage = totalStudents > 0 ? ((presentToday / totalStudents) * 100).toFixed(1) : 0;

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <BookOpen className="w-8 h-8 text-white mr-2" />
            <h1 className="text-xl font-bold text-white">EduTrack</h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-blue-600 bg-blue-50"
              onClick={() => navigate('/teacher')}
            >
              <TrendingUp className="w-4 h-4 mr-3" />
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/add-student')}
            >
              <UserPlus className="w-4 h-4 mr-3" />
              Add Student
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/add-marks')}
            >
              <BookOpen className="w-4 h-4 mr-3" />
              Add Marks
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/attendance')}
            >
              <Calendar className="w-4 h-4 mr-3" />
              Attendance
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/reports')}
            >
              <Users className="w-4 h-4 mr-3" />
              Reports
            </Button>
          </nav>
          
          <div className="p-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.full_name || 'Teacher'}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening in your classroom today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Active students in your class
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageMarks}%</div>
              <p className="text-xs text-muted-foreground">
                Class average across all subjects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendancePercentage}%</div>
              <p className="text-xs text-muted-foreground">
                {presentToday} out of {totalStudents} present
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions to manage your classroom</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center" onClick={() => navigate('/add-student')}>
                <UserPlus className="w-6 h-6 mb-2" />
                Add New Student
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate('/add-marks')}>
                <BookOpen className="w-6 h-6 mb-2" />
                Record Marks
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate('/attendance')}>
                <Calendar className="w-6 h-6 mb-2" />
                Mark Attendance
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate('/reports')}>
                <Users className="w-6 h-6 mb-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
