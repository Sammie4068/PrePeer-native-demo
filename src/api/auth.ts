import { supabase } from '@/utils/supabase';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // if (session) {
    //   const { data } = await supabase
    //     .from('profiles')
    //     .select('*')
    //     .eq('id', session.user.id)
    //     .single();

    //   return {
    //     session,
    //     user: data,
    //   };
    // }

    return { session };
  };

  const query = useQuery({
    queryKey: ['authSession'],
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000,
  });

  supabase.auth.onAuthStateChange(() => {
    queryClient.invalidateQueries({ queryKey: ['authSession'] });
  });

  return query;
};
