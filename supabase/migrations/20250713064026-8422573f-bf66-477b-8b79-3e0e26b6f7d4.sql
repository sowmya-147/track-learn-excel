
-- Enable RLS on auth.users if not already enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('student', 'teacher');

-- Create profiles table to store additional user info
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create students table
CREATE TABLE public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  roll_number TEXT NOT NULL UNIQUE,
  class TEXT NOT NULL,
  section TEXT NOT NULL,
  dob DATE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create marks table
CREATE TABLE public.marks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  exam_type TEXT NOT NULL,
  marks_obtained INTEGER NOT NULL,
  max_marks INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, date)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for students (teachers can manage all, students can view own)
CREATE POLICY "Teachers can manage all students" ON public.students
  FOR ALL USING (public.get_user_role(auth.uid()) = 'teacher');

CREATE POLICY "Students can view own record" ON public.students
  FOR SELECT USING (user_id = auth.uid() OR public.get_user_role(auth.uid()) = 'teacher');

-- RLS Policies for marks (teachers can manage all, students can view own)
CREATE POLICY "Teachers can manage all marks" ON public.marks
  FOR ALL USING (public.get_user_role(auth.uid()) = 'teacher');

CREATE POLICY "Students can view own marks" ON public.marks
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' OR 
    student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())
  );

-- RLS Policies for attendance (teachers can manage all, students can view own)
CREATE POLICY "Teachers can manage all attendance" ON public.attendance
  FOR ALL USING (public.get_user_role(auth.uid()) = 'teacher');

CREATE POLICY "Students can view own attendance" ON public.attendance
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' OR 
    student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_students_roll_number ON public.students(roll_number);
CREATE INDEX idx_students_user_id ON public.students(user_id);
CREATE INDEX idx_marks_student_id ON public.marks(student_id);
CREATE INDEX idx_attendance_student_id ON public.attendance(student_id);
CREATE INDEX idx_attendance_date ON public.attendance(date);
