import { Tabs, Separator, SizableText, H5, TabsContentProps, YStack } from 'tamagui';
import { FlatList } from 'react-native';
import UsersList from './UsersList';
import type { Group } from '@/utils/types';
import ExercisesList from './ExercisesList';
import TabSearchBar from './TabSearchBar';
import { Text } from 'tamagui';

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
  const groupMembers = groupData?.members;
  const groupExercises = groupData?.exercises;
  // console.log(JSON.stringify(groupData, null, 2));

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
          <TabSearchBar placeholder="Search exercises..." buttonText="Add Exercises" />
          {groupExercises?.length !== 0 ? (
            <FlatList
              data={groupExercises}
              renderItem={({ item }) => (
                <ExercisesList
                  title={item.title}
                  date={item.date}
                  questionCount={item.totalQuestions}
                />
              )}
              contentContainerStyle={{ padding: 10, gap: 10 }}
            />
          ) : (
            <Text m="auto">No Exercises yet, add exercises</Text>
          )}
        </YStack>
      </TabsContent>
      <TabsContent value="tab2">
        <YStack gap={10} flex={1}>
          <TabSearchBar placeholder="Search members..." />
          <FlatList
            data={groupMembers}
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
        </YStack>
      </TabsContent>
    </Tabs>
  );
}

export default GroupTabs;
