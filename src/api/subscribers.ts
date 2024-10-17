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

// export const updateGroupAdminSubscription = (id: number) => {
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const updateGroupAdminSub = supabase
//       .channel('custom-filter-channel')
//       .on(
//         'postgres_changes',
//         {
//           event: 'UPDATE',
//           schema: 'public',
//           table: 'orders',
//           filter: `id=eq.${id}`,
//         },
//         (payload) => {
//           queryClient.invalidateQueries({ queryKey: ['orders', id] });
//         }
//       )
//       .subscribe();

//     return () => {
//       updateGroupAdminSub.unsubscribe();
//     };
//   }, []);
// };
