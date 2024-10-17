import { supabase } from '@/utils/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

// export function useFetchGroupById(id: string) {
//   return useQuery({
//     queryKey: ['group', id],
//     queryFn: async () => {
//       const { data: groupData, error } = await supabase
//         .from('groups')
//         .select('*')
//         .eq('id', id)
//         .single();
//       if (error) throw new Error(error.message);

//       if (groupData) {
//         const { data: members, error: membersError } = await supabase
//           .from('groupmembers')
//           .select('*')
//           .eq('group_id', id);

//         if (membersError) throw new Error(membersError.message);
//         const memberIds = members.map((member) => member.user_id);

//         return {
//           ...groupData,
//           memberIds,
//           totalUsers: members.length,
//         };
//       }

//       return groupData;
//     },
//   });
// }
interface Member {
  id: string;
  full_name: string;
  email: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
  members: Member[];
  totalUsers: number;
}

export function useFetchGroupById(id: string) {
  return useQuery<Group, Error>({
    queryKey: ['group', id],
    queryFn: async () => {
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single();

      if (groupError) throw new Error(groupError.message);
      if (!groupData) throw new Error('Group not found');

      const { data: members, error: membersError } = await supabase
        .from('groupmembers')
        .select(
          `
          user_id,
          profiles:user_id (*)
        `
        )
        .eq('group_id', id);

      if (membersError) throw new Error(membersError.message);

      const groupMembers: Member[] = members.map((member) => ({
        id: member.profiles.id,
        full_name: member.profiles.full_name,
        email: member.profiles.email,
      }));

      return {
        ...groupData,
        members: groupMembers,
        totalUsers: groupMembers.length,
      };
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

// export const useFetchGroupMembers = (groupId: string, creatorId: string) => {
//   return useQuery({
//     queryKey: ['groupMembers', groupId],
//     queryFn: async () => {
//       const { data: groupMembers, error } = await supabase
//         .from('groupmembers')
//         .select('user_id, is_admin, users(id, full_name, avatar_url, email, created_at)')
//         .eq('group_id', groupId);

//       if (error) throw new Error(error.message);

//       const members = groupMembers.map((member) => ({
//         ...member.users,
//         is_admin: member.is_admin,
//       }));

//       // Sort members: creator first, then admins, then regular members
//       return members.sort((a, b) => {
//         if (a.id === creatorId) return -1;
//         if (b.id === creatorId) return 1;
//         if (a.is_admin && !b.is_admin) return -1;
//         if (!a.is_admin && b.is_admin) return 1;
//         return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
//       });
//     },
//   });
// };

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

export function useLeaveGroup() {
  return useMutation({
    mutationFn: async ({ group_id, user_id }: InsertTables<'groupmembers'>) => {
      const { error } = await supabase
        .from('groupmembers')
        .delete()
        .eq('group_id', group_id)
        .eq('user_id', user_id);
      if (error) throw new Error(error.message);
    },
  });
}
