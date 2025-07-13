
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import { useAttendance, useMarkAttendance } from "../hooks/useAttendance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Users } from "lucide-react";

const Attendance = () => {
  const navigate = useNavigate();
  const { data: students = [] } = useStudents();
  const today = new Date().toISOString().split('T')[0];
  const { data: existingAttendance = [] } = useAttendance(today);
  const markAttendanceMutation = useMarkAttendance();
  
  const [attendanceData, setAttendanceData] = useState<Record<string, boolean>>({});

  // Initialize attendance data
  useEffect(() => {
    const initialData: Record<string, boolean> = {};
    
    students.forEach(student => {
      const existingRecord = existingAttendance.find(
        record => record.student_id === student.id
      );
      initialData[student.id] = existingRecord?.status ?? true; // Default to present
    });
    
    setAttendanceData(initialData);
  }, [students, existingAttendance]);

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: isPresent
    }));
  };

  const handleSubmit = async () => {
    const attendanceRecords = Object.entries(attendanceData).map(([studentId, status]) => ({
      student_id: studentId,
      date: today,
      status,
    }));

    try {
      await markAttendanceMutation.mutateAsync(attendanceRecords);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const presentCount = Object.values(attendanceData).filter(Boolean).length;
  const totalCount = students.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/teacher')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="text-gray-600 mt-2">
            Today's Date: {new Date().toLocaleDateString()} | 
            Present: {presentCount} / {totalCount}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Student Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No students found. Add students first.</p>
                <Button onClick={() => navigate('/add-student')} className="mt-4">
                  Add Students
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-gray-600">
                          Roll No: {student.roll_number} | Class: {student.class}-{student.section}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Label htmlFor={`attendance-${student.id}`} className="text-sm">
                          {attendanceData[student.id] ? 'Present' : 'Absent'}
                        </Label>
                        <Switch
                          id={`attendance-${student.id}`}
                          checked={attendanceData[student.id] || false}
                          onCheckedChange={(checked) => handleAttendanceChange(student.id, checked)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    onClick={handleSubmit}
                    className="flex-1"
                    disabled={markAttendanceMutation.isPending}
                  >
                    {markAttendanceMutation.isPending ? "Submitting..." : "Submit Attendance"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/teacher')}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
