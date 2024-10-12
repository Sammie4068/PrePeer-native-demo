import { supabase } from '@/utils/supabase';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './auth';
import { InsertTables, Tables } from '@/utils/types';

export function useFetchGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data: groups, error } = await supabase.from('groups').select('*');
      if (error) throw new Error(error.message);

      return groups;
    },
  });
}

export function useFetchGroupById(id: string) {
  return useQuery({
    queryKey: ['group', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('groups').select('*').eq('id', id).single();
      if (error) throw new Error(error.message);

      return data;
    },
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  const { data: sessionData } = useAuth();
  const id = sessionData?.session?.user.id;

  return useMutation({
    async mutationFn(groupInfo: InsertTables<'groups'>) {
      const { name, description } = groupInfo;
      const { data: createdGroup, error } = await supabase
        .from('groups')
        .insert({
          name,
          description,
          admin_id: id,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return createdGroup;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}
