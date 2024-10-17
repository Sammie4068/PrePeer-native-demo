import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Main } from 'tamagui.config';
import {
  View,
  Text,
  Button,
  Avatar,
  Spinner,
  Tabs,
  Separator,
  SizableText,
  H5,
  TabsContentProps,
} from 'tamagui';
import { useFetchGroupById, useJoinGroup, useLeaveGroup } from '@/api/groups';
import ScreenSpinner from '@/components/ScreenSpinner';
import { ActivityIndicator, Alert, Pressable } from 'react-native';
import { useAuth, useFetchUserById } from '@/api/auth';
import { groupMembersSubscription } from '@/api/subscribers';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="white"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
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

const GroupTabs = () => (
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
      <H5 color={'black'}>Members</H5>
    </TabsContent>
  </Tabs>
);

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
  } = useLeaveGroup({ group_id: groupId, user_id: sessionData?.user?.id ?? '' });

  const userId = sessionData?.user?.id;

  useEffect(() => {
    if (groupData && userId) {
      const isUserMember =
        groupData.memberIds.includes(userId) || groupData.adminIds.includes(userId);
      setIsMember(isUserMember);
    }
  }, [groupData, userId]);

  const handleJoinGroup = () => {
    if (userId) {
      joinGroup(
        { group_id: groupId, user_id: userId },
        {
          onSuccess: () => {
            setIsMember(true);
            groupMembersSubscription(groupId);
          },
        }
      );
    }
  };

  if (!groupId) return null;
  if (isLoading) return <ScreenSpinner />;
  if (error) return <Text m="auto">{error.message}</Text>;

  const handleLeaveGroup = () => {
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave this group?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            leaveGroup();
            setIsMember(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (leaveGroupPending) return <ScreenSpinner />;

  if (leaveGroupError) return <Text m="auto">{leaveGroupError.message}</Text>;
  if (joinGroupError) return <Text m="auto">{joinGroupError.message}</Text>;

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
                0
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
                <Text gap={5} alignItems="center">
                  Leave Group
                  <FontAwesome6
                    name="door-open"
                    size={25}
                    color="red"
                    // style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
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
          <GroupTabs />
        ) : (
          <Button width={'50%'} margin={'auto'} onPress={handleJoinGroup}>
            {isPending ? <Spinner color={'white'} /> : 'Join Group'}
          </Button>
        )}
      </View>
    </Main>
  );
}
