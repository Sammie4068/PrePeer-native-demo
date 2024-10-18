import { Tabs, Separator, SizableText, H5, TabsContentProps, YStack } from 'tamagui';
import { FlatList } from 'react-native';
import UsersList from './UsersList';
import type { Member, Group } from '@/utils/types';

interface GroupDataProps {
  groupData?: {
    members: {
      id: string;
      full_name: string;
      email: string;
      isAdmin: boolean | null;
    }[];
    totalUsers: number;
    created_at: string;
    created_by: string;
    description: string;
    id: string;
    name: string;
  };
}

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
  console.log(JSON.stringify(groupData, null, 2));
  const groupMembers = groupData?.members;

  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={'100%'}
      height={600}
      backgroundColor={'whitesmoke'}
      overflow="hidden"
      borderColor="$borderColor">
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Group Tabs">
        <Tabs.Tab flex={1} value="tab1">
          <SizableText fontFamily="$body">Exercise</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="tab2">
          <SizableText fontFamily="$body">Members</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator />
      <TabsContent value="tab1">
        <H5 color={'black'}>Exercise</H5>
      </TabsContent>
      <TabsContent value="tab2">
        <YStack>
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
