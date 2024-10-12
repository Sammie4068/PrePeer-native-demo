import { supabase } from '@/utils/supabase';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

export function useAuth() {
  const queryClient = useQueryClient();

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      return {
        session,
        user: data,
      };
    }

    return { session: null, user: null };
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
}

export function useSignUp() {
  return useMutation({
    async mutationFn(userInfo: any) {
      const { username, email, password } = userInfo;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      if (data?.user) {
        const { id: user_id } = data.user;
        const { data: userData, error: profileError } = await supabase
          .from('profiles')
          .update({
            username,
          })
          .eq('id', user_id)
          .select()
          .single();
        if (profileError) throw new Error(profileError.message);
        return { userData };
      }
    },
  });
}
