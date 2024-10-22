import { Tabs, Separator, SizableText, H5, TabsContentProps, YStack, Input } from 'tamagui';
import { FlatList } from 'react-native';
import UsersList from './UsersList';
import type { Group, Member, Tables } from '@/utils/types';
import ExercisesList from './ExercisesList';
import TabSearchBar from './TabSearchBar';
import { Text } from 'tamagui';
import { useExerciseSubscription } from '@/api/subscribers';
import { useEffect, useState } from 'react';

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="white"
      key="tab3"
      padding="$2"
      flex={1}
      borderColor="white"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}>
      {props.children}
    </Tabs.Content>
  );
};

function GroupTabs({ groupData }: { groupData: Group | undefined }) {
  const [exerciseSearchTerm, setExerciseSearchTerm] = useState('');
  const [memberSearchTerm, setMemberSearchTerm] = useState('');

  useExerciseSubscription(groupData?.id);

  const groupExercises = groupData?.exercises?.slice().sort((a: any, b: any) => {
    if (a.created_at && b.created_at) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });
  const [renderedExercises, setRenderedExercises] = useState<Tables<'exercises'>[] | any>([]);
  const [renderedMembers, setRenderedMembers] = useState<Member[] | undefined>([]);

  // console.log(JSON.stringify(renderedMembers, null, 2));

  useEffect(() => {
    if (groupData?.exercises) {
      const filteredExercises = groupData.exercises
        .filter((exercise: any) =>
          exercise.title.toLowerCase().includes(exerciseSearchTerm?.toLowerCase())
        )
        .sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      setRenderedExercises(filteredExercises);
    }

    if (groupData?.members) {
      const filteredMembers = groupData?.members.filter((member: Member) => {
        return member.full_name.toLowerCase().includes(memberSearchTerm.toLowerCase());
      });
      setRenderedMembers(filteredMembers);
    }
  }, [exerciseSearchTerm, groupData?.exercises, groupData?.members, memberSearchTerm]);

  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={'100%'}
      height={500}
      backgroundColor={'whitesmoke'}
      overflow="hidden"
      borderColor="$borderColor">
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Group Tabs">
        <Tabs.Tab flex={1} value="tab1">
          <SizableText fontFamily="$body">Exercises</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="tab2">
          <SizableText fontFamily="$body">Members</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator />
      <TabsContent value="tab1">
        <YStack gap={10} flex={1}>
          <TabSearchBar
            placeholder="Search exercises..."
            buttonText="Add Exercises"
            groupId={groupData?.id}
            value={exerciseSearchTerm}
            onChange={(e) => setExerciseSearchTerm(e)}
          />
          {groupExercises?.length !== 0 ? (
            renderedExercises?.length !== 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={renderedExercises}
                renderItem={({ item }) => (
                  <ExercisesList
                    groupId={item.group_id}
                    id={item.id}
                    title={item.title}
                    date={item.date}
                    questionCount={item.totalQuestions}
                  />
                )}
                contentContainerStyle={{ padding: 10, gap: 10 }}
              />
            ) : (
              <Text m="auto" fontSize={15}>{`No search result for "${exerciseSearchTerm}"`}</Text>
            )
          ) : (
            <Text m="auto">No Exercises yet, add exercises</Text>
          )}
        </YStack>
      </TabsContent>
      <TabsContent value="tab2">
        <YStack gap={10} flex={1}>
          <TabSearchBar
            placeholder="Search members..."
            value={memberSearchTerm}
            onChange={(e) => setMemberSearchTerm(e)}
          />
          {renderedMembers?.length !== 0 ? (
            <FlatList
              data={renderedMembers}
              renderItem={({ item }) => (
                <UsersList
                  img={null}
                  name={item.full_name}
                  email={item.email}
                  isAdmin={item.isAdmin}
                />
              )}
              contentContainerStyle={{ padding: 10, gap: 10 }}
            />
          ) : (
            <Text m="auto" fontSize={15}>{`No search result for "${memberSearchTerm}"`}</Text>
          )}
        </YStack>
      </TabsContent>
    </Tabs>
  );
}

export default GroupTabs;
