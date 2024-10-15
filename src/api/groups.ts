import { supabase } from '@/utils/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './auth';
import { InsertTables } from '@/utils/types';
import { useRouter } from 'expo-router';

export function useFetchGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data: groups, error } = await supabase.from('groups').select('*');

      if (error) throw new Error(error.message);

      if (groups) {
        const { data: members, error: membersError } = await supabase
          .from('groupmembers')
          .select('group_id, user_id, is_admin');

        if (membersError) throw new Error(membersError.message);

        const groupsWithMemberInfo = groups.map((group) => {
          const groupMembers = members.filter((member) => member.group_id === group.id);

          const memberIds = groupMembers
            .filter((member) => !member.is_admin)
            .map((member) => member.user_id);

          const adminIds = groupMembers
            .filter((member) => member.is_admin)
            .map((member) => member.user_id);

          return {
            ...group,
            memberIds,
            adminIds,
            totalUsers: groupMembers.length,
          };
        });

        return groupsWithMemberInfo;
      }

      return groups;
    },
  });
}

export function useFetchGroupById(id: string) {
  return useQuery({
    queryKey: ['group', id],
    queryFn: async () => {
      const { data: groupData, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);

      if (groupData) {
        const { data: members, error: membersError } = await supabase
          .from('groupmembers')
          .select('*')
          .eq('group_id', id);

        if (membersError) throw new Error(membersError.message);
        const memberIds = members
          .filter((member) => !member.is_admin)
          .map((member) => member.user_id);

        const adminIds = members
          .filter((member) => member.is_admin)
          .map((member) => member.user_id);
        return {
          ...groupData,
          memberIds,
          adminIds,
          totalUsers: members.length,
        };
      }

      return groupData;
    },
  });
}

export function useCreateGroup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (groupInfo: InsertTables<'groups'>) => {
      const { name, description, created_by } = groupInfo;
      const { data: createdGroup, error } = await supabase
        .from('groups')
        .insert({
          name,
          description,
          created_by: created_by,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (createdGroup) {
        const { error } = await supabase.from('groupmembers').insert({
          user_id: created_by,
          group_id: createdGroup.id,
          joined_at: createdGroup.created_at,
          is_admin: true,
        });
        if (error) {
          throw new Error(error.message);
        }
      }

      return createdGroup;
    },
    onSuccess: (createdGroup) => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      if (createdGroup && createdGroup.id) {
        router.push(`/(tabs)/groups/${createdGroup.id}`);
      } else {
        throw new Error('Created group or group ID is undefined');
      }
    },
  });
}

export function useFetchGroupMembers(id: string) {
  return useQuery({
    queryKey: ['groupmembers', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('groupmembers').select('*').eq('group_id', id);
      if (error) throw new Error(error.message);
      return data;
    },
  });
}

export function useJoinGroup() {
  return useMutation({
    mutationFn: async ({ group_id, user_id }: InsertTables<'groupmembers'>) => {
      const { data, error } = await supabase
        .from('groupmembers')
        .insert({
          user_id,
          group_id,
          is_admin: false,
        })
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
  });
}
