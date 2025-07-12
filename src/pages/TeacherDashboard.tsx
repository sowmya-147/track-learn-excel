
import { useAuth } from "../App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Calendar, FileText, UserPlus, ClipboardList, BarChart3, LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", href: "/teacher", active: true },
    { icon: UserPlus, label: "Add Student", href: "/add-student" },
    { icon: ClipboardList, label: "Add Marks", href: "/add-marks" },
    { icon: Calendar, label: "Attendance", href: "/attendance" },
    { icon: FileText, label: "Reports", href: "/reports" }
  ];

  const stats = [
    { title: "Total Students", value: "142", icon: Users, color: "bg-blue-500" },
    { title: "Average Performance", value: "87.5%", icon: TrendingUp, color: "bg-green-500" },
    { title: "Attendance Rate", value: "94.2%", icon: Calendar, color: "bg-purple-500" },
    { title: "Reports Generated", value: "28", icon: FileText, color: "bg-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Teacher Portal</h2>
          <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                item.active ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
          
          <button
            onClick={logout}
            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-6"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-0">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Monitor student performance and manage academic records</p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage students and academic records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/add-student">
                  <Button className="w-full justify-start" variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Student
                  </Button>
                </Link>
                <Link to="/add-marks">
                  <Button className="w-full justify-start" variant="outline">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Record Marks
                  </Button>
                </Link>
                <Link to="/attendance">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Mark Attendance
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">John Smith submitted Math test</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">Sarah Johnson marked present</span>
                    <span className="text-xs text-gray-500">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm">New student Emma Davis added</span>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
