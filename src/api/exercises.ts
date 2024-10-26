import { supabase } from '@/utils/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Exercise, InsertTables } from '@/utils/types';

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

export function useGetExerciseById(id: string) {
  return useQuery<Exercise>({
    queryKey: ['exercise', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exercises')
        .select(
          `
          *,
          questions!exercise_id(*),
          profiles!created_by(*)
        `
        )
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
}
