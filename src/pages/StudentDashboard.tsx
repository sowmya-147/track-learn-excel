
import { useAuth } from "../App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { BookOpen, TrendingUp, Calendar, Award, LogOut, User } from "lucide-react";

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  // Mock data for charts
  const marksData = [
    { month: "Jan", math: 85, english: 78, science: 82 },
    { month: "Feb", math: 88, english: 82, science: 85 },
    { month: "Mar", math: 92, english: 85, science: 88 },
    { month: "Apr", math: 89, english: 88, science: 90 },
    { month: "May", math: 94, english: 90, science: 92 }
  ];

  const subjectPerformance = [
    { subject: "Math", marks: 94, total: 100 },
    { subject: "English", marks: 90, total: 100 },
    { subject: "Science", marks: 92, total: 100 },
    { subject: "History", marks: 86, total: 100 },
    { subject: "Geography", marks: 88, total: 100 }
  ];

  const attendancePercentage = 94.2;
  const totalSubjects = 8;
  const averageMarks = 90.0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{user?.name}</h1>
                <p className="text-sm text-gray-600">Class 10-A</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h2>
          <p className="text-gray-600">Track your academic progress and performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSubjects}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Marks</p>
                  <p className="text-2xl font-bold text-gray-900">{averageMarks}%</p>
                </div>
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">{attendancePercentage}%</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rank</p>
                  <p className="text-2xl font-bold text-gray-900">3rd</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Progress */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Your marks over the past 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="math" stroke="#3b82f6" strokeWidth={2} name="Math" />
                  <Line type="monotone" dataKey="english" stroke="#10b981" strokeWidth={2} name="English" />
                  <Line type="monotone" dataKey="science" stroke="#f59e0b" strokeWidth={2} name="Science" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Latest test scores by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="marks" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Attendance Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>Your attendance record this semester</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Attendance</span>
                  <span className="text-sm text-gray-600">{attendancePercentage}%</span>
                </div>
                <Progress value={attendancePercentage} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">188</p>
                  <p className="text-sm text-gray-600">Days Present</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">12</p>
                  <p className="text-sm text-gray-600">Days Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest activities and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Math Test Result</p>
                    <p className="text-xs text-gray-600">You scored 94/100 in the latest math test</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Attendance Marked</p>
                    <p className="text-xs text-gray-600">Present for all classes today</p>
                    <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Assignment Due</p>
                    <p className="text-xs text-gray-600">Science project due next Monday</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
