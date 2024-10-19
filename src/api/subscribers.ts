import { supabase } from '@/utils/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGroupMembersSubscription = (id: string) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const groupMembersSub = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'groupmembers' },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['groupMembers', id] });
        }
      )
      .subscribe();

    return () => {
      groupMembersSub.unsubscribe();
    };
  });
};

export const useExerciseSubscription = (id: string | undefined) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const exerciseSub = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exercises' }, (payload) => {
        queryClient.invalidateQueries({ queryKey: ['group', id] });
      })
      .subscribe();

    return () => {
      exerciseSub.unsubscribe();
    };
  });
};
