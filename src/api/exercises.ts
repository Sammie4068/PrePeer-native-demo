import { supabase } from '@/utils/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InsertTables } from '@/utils/types';

export function useAddExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (exercise: InsertTables<'exercises'>) => {
      const { data, error } = await supabase.from('exercises').insert(exercise).select().single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['group', data.group_id] });
    },
  });
}
