
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  present: boolean;
}

const Attendance = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "John Smith", rollNumber: "001", class: "10", section: "A", present: true },
    { id: 2, name: "Sarah Johnson", rollNumber: "002", class: "10", section: "A", present: true },
    { id: 3, name: "Emma Davis", rollNumber: "003", class: "10", section: "A", present: false },
    { id: 4, name: "Michael Brown", rollNumber: "004", class: "10", section: "A", present: true },
    { id: 5, name: "Lisa Wilson", rollNumber: "005", class: "10", section: "A", present: true },
    { id: 6, name: "David Garcia", rollNumber: "006", class: "10", section: "A", present: false },
    { id: 7, name: "Jennifer Martinez", rollNumber: "007", class: "10", section: "A", present: true },
    { id: 8, name: "Robert Taylor", rollNumber: "008", class: "10", section: "A", present: true },
    { id: 9, name: "Amanda Anderson", rollNumber: "009", class: "10", section: "A", present: true },
    { id: 10, name: "Christopher Lee", rollNumber: "010", class: "10", section: "A", present: false }
  ]);

  const toggleAttendance = (id: number) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  const handleSubmit = () => {
    const presentCount = students.filter(s => s.present).length;
    const totalCount = students.length;
    const attendanceRate = ((presentCount / totalCount) * 100).toFixed(1);

    toast({
      title: "Attendance Recorded",
      description: `${presentCount}/${totalCount} students present (${attendanceRate}%)`
    });
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: true })));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: false })));
  };

  const presentCount = students.filter(s => s.present).length;
  const absentCount = students.length - presentCount;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/teacher" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mark Attendance</h1>
          <p className="text-gray-600">Record daily attendance for Class 10-A</p>
        </div>

        <div className="mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                    <p className="text-sm text-gray-600">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                    <p className="text-sm text-gray-600">Absent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{students.length}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={markAllPresent}>
                    Mark All Present
                  </Button>
                  <Button variant="outline" size="sm" onClick={markAllAbsent}>
                    Mark All Absent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Student Attendance - {new Date().toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.rollNumber}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">
                          Roll: {student.rollNumber} | Class: {student.class}-{student.section}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant={student.present ? "default" : "destructive"}>
                      {student.present ? "Present" : "Absent"}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={student.present ? "default" : "outline"}
                        onClick={() => toggleAttendance(student.id)}
                        className="w-10 h-8 p-0"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={!student.present ? "destructive" : "outline"}
                        onClick={() => toggleAttendance(student.id)}
                        className="w-10 h-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Submit Attendance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
