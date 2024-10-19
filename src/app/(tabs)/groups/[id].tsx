import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Main } from 'tamagui.config';
import { View, Text, Button, Avatar, Spinner } from 'tamagui';
import { useFetchGroupById, useJoinGroup, useLeaveGroup } from '@/api/groups';
import ScreenSpinner from '@/components/ScreenSpinner';
import { Alert, Pressable } from 'react-native';
import { useAuth, useFetchUserById } from '@/api/auth';
import { useGroupMembersSubscription } from '@/api/subscribers';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useQueryClient } from '@tanstack/react-query';
import GroupTabs from '@/components/GroupTabs';

export default function GroupScreen() {
  const { id: idStr } = useLocalSearchParams();
  const groupId = typeof idStr === 'string' ? idStr : idStr[0];
  const { data: groupData, isLoading, error } = useFetchGroupById(groupId);
  const { data: adminData } = useFetchUserById(groupData?.created_by);
  const { data: sessionData } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const { mutate: joinGroup, isPending, error: joinGroupError } = useJoinGroup();
  const {
    mutate: leaveGroup,
    isPending: leaveGroupPending,
    error: leaveGroupError,
  } = useLeaveGroup();
  const queryClient = useQueryClient();

  const userId = sessionData?.user?.id;

  const memberIds = groupData?.members.map((mem) => mem.id);

  useEffect(() => {
    if (memberIds && userId) {
      const isUserMember = memberIds.includes(userId);
      setIsMember(isUserMember);
    }
  }, [groupData, userId]);

  useGroupMembersSubscription(groupId);

  const handleJoinGroup = () => {
    if (userId) {
      joinGroup(
        { group_id: groupId, user_id: userId },
        {
          onSuccess: () => {
            setIsMember(true), queryClient.invalidateQueries({ queryKey: ['group', groupId] });
          },
        }
      );
    }
  };

  const handleLeaveGroup = () => {
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave this group?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            leaveGroup(
              {
                group_id: groupId,
                user_id: sessionData?.user?.id ?? '',
              },
              {
                onSuccess: () => {
                  setIsMember(false);
                  queryClient.invalidateQueries({ queryKey: ['group', groupId] });
                },
              }
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!groupId) return;
  if (isLoading || leaveGroupPending) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <ScreenSpinner />
      </>
    );
  }

  if (error || leaveGroupError || joinGroupError) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Text m="auto">Something went wrong, Try Again</Text>
      </>
    );
  }

  return (
    <Main marginVertical={isMember ? 0 : 'auto'}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View>
        <View margin={20} gap={10}>
          <Text fontSize={25} fontWeight={'700'}>
            {groupData?.name}
          </Text>
          <Text fontSize={15} fontWeight={'500'} color={'gray'} alignItems="center">
            {groupData?.description}
          </Text>
          <View flexDirection="row" alignItems="center" justifyContent="space-between">
            <View justifyContent="center" gap={5} alignItems="baseline" marginBottom={20}>
              <Text fontWeight={'500'}>Created By</Text>
              <Avatar circular size="$5">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
                <Avatar.Fallback backgroundColor="#000" />
              </Avatar>
              <View justifyContent="center" alignItems="center">
                <Text fontSize={10} fontWeight={'600'} textAlign="center">
                  {adminData?.full_name}
                </Text>
                <Text fontSize={8} color={'grey'} textAlign="center">
                  {adminData?.email}
                </Text>
              </View>
            </View>
            <View>
              <Text fontSize={30} fontWeight={'700'} textAlign="center">
                {groupData?.totalExercises}
              </Text>
              <Text fontWeight={'600'} color={'grey'}>
                Exercises
              </Text>
            </View>
            <View>
              <Text fontSize={30} fontWeight={'700'} textAlign="center">
                {groupData?.totalUsers}
              </Text>
              <Text fontWeight={'600'} color={'grey'}>
                Member
              </Text>
            </View>
          </View>
          {isMember && (
            <Pressable onPress={handleLeaveGroup}>
              {({ pressed }) => (
                <Text gap={10} alignItems="center" color={'red'}>
                  Leave Group
                  <FontAwesome6
                    name="door-open"
                    size={20}
                    color="red"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                </Text>
              )}
            </Pressable>
          )}
        </View>

        {joinGroupError ? (
          <View m="auto" gap="$2">
            <Text color="red" fontSize={15}>
              Something went wrong, please try again..
            </Text>
            <Button width={'50%'} margin={'auto'} textAlign="center" onPress={handleJoinGroup}>
              {isPending ? <Spinner color={'white'} /> : 'Join Group'}
            </Button>
          </View>
        ) : isMember ? (
          <GroupTabs groupData={groupData} />
        ) : (
          <Button width={'50%'} margin={'auto'} onPress={handleJoinGroup}>
            {isPending ? <Spinner color={'white'} /> : 'Join Group'}
          </Button>
        )}
      </View>
    </Main>
  );
}
