
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Attendance {
  id: string;
  student_id: string;
  date: string;
  status: boolean;
}

export const useAttendance = (date?: string) => {
  return useQuery({
    queryKey: ['attendance', date],
    queryFn: async () => {
      let query = supabase
        .from('attendance')
        .select(`
          *,
          students (
            name,
            roll_number
          )
        `);
      
      if (date) {
        query = query.eq('date', date);
      }
      
      const { data, error } = await query.order('students(name)');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (attendanceRecords: Omit<Attendance, 'id'>[]) => {
      const { data, error } = await supabase
        .from('attendance')
        .upsert(attendanceRecords, { 
          onConflict: 'student_id,date' 
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast({
        title: "Success",
        description: "Attendance marked successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark attendance",
        variant: "destructive",
      });
    },
  });
};
