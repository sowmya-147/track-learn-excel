
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AddMarks = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    subject: "",
    examType: "",
    marksObtained: "",
    maxMarks: ""
  });

  // Mock student data
  const students = [
    "John Smith", "Sarah Johnson", "Emma Davis", "Michael Brown", "Lisa Wilson",
    "David Garcia", "Jennifer Martinez", "Robert Taylor", "Amanda Anderson", "Christopher Lee"
  ];

  const subjects = [
    "Mathematics", "English", "Science", "History", "Geography", 
    "Physics", "Chemistry", "Biology", "Computer Science", "Physical Education"
  ];

  const examTypes = ["Midterm", "Final", "Unit Test", "Quiz", "Assignment"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.subject || !formData.examType || !formData.marksObtained || !formData.maxMarks) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const obtained = parseInt(formData.marksObtained);
    const maximum = parseInt(formData.maxMarks);

    if (obtained > maximum) {
      toast({
        title: "Error",
        description: "Marks obtained cannot be greater than maximum marks",
        variant: "destructive"
      });
      return;
    }

    const percentage = ((obtained / maximum) * 100).toFixed(1);

    toast({
      title: "Success",
      description: `Marks recorded for ${formData.studentName}: ${obtained}/${maximum} (${percentage}%)`
    });

    // Reset form
    setFormData({
      studentName: "",
      subject: "",
      examType: "",
      marksObtained: "",
      maxMarks: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/teacher" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Student Marks</h1>
          <p className="text-gray-600">Record student performance for tests and assignments</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              Mark Entry Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name *</Label>
                <Select value={formData.studentName} onValueChange={(value) => handleInputChange('studentName', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student} value={student}>{student}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examType">Exam Type *</Label>
                  <Select value={formData.examType} onValueChange={(value) => handleInputChange('examType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {examTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="marksObtained">Marks Obtained *</Label>
                  <Input
                    id="marksObtained"
                    type="number"
                    min="0"
                    placeholder="Enter marks obtained"
                    value={formData.marksObtained}
                    onChange={(e) => handleInputChange('marksObtained', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Maximum Marks *</Label>
                  <Input
                    id="maxMarks"
                    type="number"
                    min="1"
                    placeholder="Enter maximum marks"
                    value={formData.maxMarks}
                    onChange={(e) => handleInputChange('maxMarks', e.target.value)}
                  />
                </div>
              </div>

              {formData.marksObtained && formData.maxMarks && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Percentage:</strong> {((parseInt(formData.marksObtained) / parseInt(formData.maxMarks)) * 100).toFixed(1)}%
                  </p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Submit Marks
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setFormData({
                  studentName: "",
                  subject: "",
                  examType: "",
                  marksObtained: "",
                  maxMarks: ""
                })}>
                  Clear Form
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
