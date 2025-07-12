
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Download, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const [selectedStudent, setSelectedStudent] = useState("");

  // Mock student data
  const students = [
    "John Smith", "Sarah Johnson", "Emma Davis", "Michael Brown", "Lisa Wilson",
    "David Garcia", "Jennifer Martinez", "Robert Taylor", "Amanda Anderson", "Christopher Lee"
  ];

  // Mock report data
  const reportData = {
    studentInfo: {
      name: selectedStudent || "Select a student",
      rollNumber: "001",
      class: "10",
      section: "A",
      admissionNumber: "ADM2023001"
    },
    subjects: [
      { name: "Mathematics", midterm: 88, final: 94, total: 182, maxMarks: 200, percentage: 91.0, grade: "A+" },
      { name: "English", midterm: 82, final: 88, total: 170, maxMarks: 200, percentage: 85.0, grade: "A" },
      { name: "Science", midterm: 85, final: 92, total: 177, maxMarks: 200, percentage: 88.5, grade: "A+" },
      { name: "History", midterm: 79, final: 84, total: 163, maxMarks: 200, percentage: 81.5, grade: "B+" },
      { name: "Geography", midterm: 83, final: 87, total: 170, maxMarks: 200, percentage: 85.0, grade: "A" },
      { name: "Computer Science", midterm: 92, final: 96, total: 188, maxMarks: 200, percentage: 94.0, grade: "A+" }
    ],
    summary: {
      totalMarks: 1050,
      maxMarks: 1200,
      percentage: 87.5,
      overallGrade: "A",
      attendance: 94.2,
      rank: 3
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800";
      case "A": return "bg-blue-100 text-blue-800";
      case "B+": return "bg-yellow-100 text-yellow-800";
      case "B": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleExportPDF = () => {
    toast({
      title: "Export Initiated",
      description: "Report card is being prepared for download..."
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 no-print">
          <Link to="/teacher" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Reports</h1>
          <p className="text-gray-600">Generate and export detailed student performance reports</p>
        </div>

        {/* Student Selection */}
        <Card className="mb-6 no-print">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Generate Report Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student} value={student}>{student}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePrint} variant="outline" disabled={!selectedStudent}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button onClick={handleExportPDF} disabled={!selectedStudent}>
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Card */}
        {selectedStudent && (
          <div className="space-y-6">
            {/* Header */}
            <Card className="print:shadow-none">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">ACADEMIC REPORT CARD</h1>
                  <p className="text-gray-600">Academic Year 2023-2024</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Student Information</h3>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {reportData.studentInfo.name}</p>
                      <p><strong>Roll Number:</strong> {reportData.studentInfo.rollNumber}</p>
                      <p><strong>Class:</strong> {reportData.studentInfo.class}-{reportData.studentInfo.section}</p>
                      <p><strong>Admission No:</strong> {reportData.studentInfo.admissionNumber}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
                    <div className="space-y-2">
                      <p><strong>Total Marks:</strong> {reportData.summary.totalMarks}/{reportData.summary.maxMarks}</p>
                      <p><strong>Percentage:</strong> {reportData.summary.percentage}%</p>
                      <p><strong>Overall Grade:</strong> 
                        <Badge className={`ml-2 ${getGradeColor(reportData.summary.overallGrade)}`}>
                          {reportData.summary.overallGrade}
                        </Badge>
                      </p>
                      <p><strong>Class Rank:</strong> {reportData.summary.rank}</p>
                      <p><strong>Attendance:</strong> {reportData.summary.attendance}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marks Table */}
            <Card className="print:shadow-none">
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Detailed marks breakdown by subject</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead className="text-center">Midterm</TableHead>
                      <TableHead className="text-center">Final</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Max Marks</TableHead>
                      <TableHead className="text-center">Percentage</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.subjects.map((subject) => (
                      <TableRow key={subject.name}>
                        <TableCell className="font-medium">{subject.name}</TableCell>
                        <TableCell className="text-center">{subject.midterm}</TableCell>
                        <TableCell className="text-center">{subject.final}</TableCell>
                        <TableCell className="text-center font-medium">{subject.total}</TableCell>
                        <TableCell className="text-center">{subject.maxMarks}</TableCell>
                        <TableCell className="text-center">{subject.percentage}%</TableCell>
                        <TableCell className="text-center">
                          <Badge className={getGradeColor(subject.grade)}>
                            {subject.grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Performance Analysis */}
            <Card className="print:shadow-none">
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Strengths</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>Excellent in Computer Science</li>
                      <li>Strong Mathematical Skills</li>
                      <li>Consistent Performance</li>
                    </ul>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Achievements</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>Top 3 in Class</li>
                      <li>95%+ Attendance</li>
                      <li>A+ in 3 Subjects</li>
                    </ul>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Areas for Improvement</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>Focus on History</li>
                      <li>Regular Practice</li>
                      <li>Time Management</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-2">Class Teacher's Remark:</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {reportData.studentInfo.name} has shown excellent academic performance throughout the year. 
                        Their dedication to studies and consistent efforts are commendable. 
                        With continued focus on weaker subjects, they can achieve even better results.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Parent's Signature:</h4>
                      <div className="border-2 border-dashed border-gray-300 h-16 rounded flex items-center justify-center text-gray-500 text-sm">
                        Signature Space
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
