
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Mark {
  id: string;
  student_id: string;
  subject: string;
  exam_type: string;
  marks_obtained: number;
  max_marks: number;
  created_at: string;
}

export const useMarks = (studentId?: string) => {
  return useQuery({
    queryKey: ['marks', studentId],
    queryFn: async () => {
      let query = supabase
        .from('marks')
        .select(`
          *,
          students (
            name,
            roll_number
          )
        `)
        .order('created_at', { ascending: false });
      
      if (studentId) {
        query = query.eq('student_id', studentId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    enabled: !studentId || !!studentId,
  });
};

export const useAddMark = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (mark: Omit<Mark, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('marks')
        .insert([mark])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marks'] });
      toast({
        title: "Success",
        description: "Marks added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add marks",
        variant: "destructive",
      });
    },
  });
};
