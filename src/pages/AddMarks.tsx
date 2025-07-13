
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import { useAddMark } from "../hooks/useMarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BookOpen } from "lucide-react";

const AddMarks = () => {
  const navigate = useNavigate();
  const { data: students = [] } = useStudents();
  const addMarkMutation = useAddMark();
  
  const [formData, setFormData] = useState({
    student_id: "",
    subject: "",
    exam_type: "",
    marks_obtained: "",
    max_marks: "",
  });

  const examTypes = ["Midterm", "Final", "Unit Test", "Quiz", "Assignment"];
  const subjects = ["Mathematics", "English", "Science", "History", "Geography", "Physics", "Chemistry", "Biology"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addMarkMutation.mutateAsync({
        student_id: formData.student_id,
        subject: formData.subject,
        exam_type: formData.exam_type,
        marks_obtained: parseInt(formData.marks_obtained),
        max_marks: parseInt(formData.max_marks),
      });
      
      setFormData({
        student_id: "",
        subject: "",
        exam_type: "",
        marks_obtained: "",
        max_marks: "",
      });
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/teacher')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Add Student Marks</h1>
          <p className="text-gray-600 mt-2">Record marks for student assessments.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Mark Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="student_id">Student</Label>
                  <Select value={formData.student_id} onValueChange={(value) => handleSelectChange('student_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} - {student.roll_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleSelectChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exam_type">Exam Type</Label>
                  <Select value={formData.exam_type} onValueChange={(value) => handleSelectChange('exam_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {examTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marks_obtained">Marks Obtained</Label>
                  <Input
                    id="marks_obtained"
                    name="marks_obtained"
                    type="number"
                    placeholder="Enter marks obtained"
                    value={formData.marks_obtained}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_marks">Maximum Marks</Label>
                  <Input
                    id="max_marks"
                    name="max_marks"
                    type="number"
                    placeholder="Enter maximum marks"
                    value={formData.max_marks}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={addMarkMutation.isPending}
                >
                  {addMarkMutation.isPending ? "Adding Marks..." : "Add Marks"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/teacher')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddMarks;
