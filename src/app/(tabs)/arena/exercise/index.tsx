import { useAuth } from '@/api/auth';
import { useFetchGroupById } from '@/api/groups';
import QuestionCard from '@/components/questionCard';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, YStack, XStack, Avatar, Button } from 'tamagui';
import { Container, Main } from 'tamagui.config';

export default function ExercisePage() {
  const { id, groupId } = useLocalSearchParams();
  const group_id = typeof groupId === 'string' ? groupId : groupId[0];
  const exercise_id = typeof id === 'string' ? id : id[0];

  const { data: groupData, isLoading, error } = useFetchGroupById(group_id);
  const { data: sessionData } = useAuth();
  const [isMember, setIsMember] = useState(false);

  const userId = sessionData?.user?.id;
  const memberIds = groupData?.members.map((mem) => mem.id);

  useEffect(() => {
    if (memberIds && userId) {
      const isUserMember = memberIds.includes(userId);
      setIsMember(isUserMember);
    }
  }, [groupData, userId]);

  if (!isMember) {
    return (
      <Main>
        <YStack>
          <Text>You are not a member of this group</Text>
        </YStack>
      </Main>
    );
  }

  return (
    <Main>
      <YStack p={24} gap={10}>
        <XStack justifyContent="space-between">
          <View gap={10}>
            <Text fontSize={25} fontWeight={'700'}>
              Cyb 204
            </Text>
            <Text fontSize={15} fontWeight={'500'} color={'gray'}>
              Wednesday, 12th Dec 2024
            </Text>
          </View>

          <View justifyContent="center" gap={5} alignItems="baseline" marginBottom={20}>
            <Text fontWeight={'500'}>Created By</Text>
            <Avatar circular size="$5">
              <Avatar.Image
                accessibilityLabel="user-profile-picture"
                src={
                  'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80'
                }
              />
              <Avatar.Fallback backgroundColor="#000" />
            </Avatar>
            <View justifyContent="center" alignItems="center">
              <Text fontSize={10} fontWeight={'600'} textAlign="center">
                Luke Jonas
              </Text>
              <Text fontSize={8} color={'grey'} textAlign="center">
                Luke@email.com
              </Text>
            </View>
          </View>
        </XStack>

        <YStack borderTopColor={'#000'} gap={20}>
          <XStack alignItems="center" justifyContent="space-between" borderBottomColor={'#000'}>
            <Text fontSize={20} fontWeight={'600'}>
              30 Questions
            </Text>
            <Button
              variant="outlined"
              backgroundColor={'transparent'}
              borderColor={'#000'}
              color={'#000'}
              iconAfter={<FontAwesome6 name="add" size={24} color="#000" />}>
              Add question
            </Button>
          </XStack>

          <YStack gap={5}>
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
          </YStack>
        </YStack>
      </YStack>
    </Main>
  );
}
