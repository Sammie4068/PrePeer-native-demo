import { useFetchGroups } from '@/api/groups';
import ScreenSpinner from '@/components/ScreenSpinner';
import { Stack, useRouter } from 'expo-router';
import { Alert, FlatList } from 'react-native';
import { View, Text, YGroup, Separator, ListItem } from 'tamagui';
import { useAuth } from '@/api/auth';
import Badge from '@/components/Badge';

export default function Groups() {
  const router = useRouter();

  const { data: sessionData } = useAuth();
  const { data: groups, isLoading, error } = useFetchGroups();

  const userId = sessionData?.user?.id;

  function checkUser(group: any) {
    if (group.memberIds.includes(userId) || group.adminIds.includes(userId)) {
      router.push(`/(tabs)/groups/${group.id}`);
    } else {
      Alert.alert('You are not a member of this group');
    }
  }

  if (isLoading) return <ScreenSpinner />;
  if (error) return <Text m="auto">Failed to fetch groups</Text>;
  if (!groups || groups.length < 1)
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={'$9'}>No Groups</Text>
      </View>
    );

  return (
    <>
      <Stack.Screen options={{ title: 'Groups' }} />
      <YGroup width={'100%'} size="$5" separator={<Separator />}>
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <YGroup.Item>
              <ListItem
                hoverTheme
                pressTheme
                title={item.name}
                subTitle={item.description}
                iconAfter={<Badge total={item.totalUsers} />}
                onPress={() => checkUser(item)}
              />
            </YGroup.Item>
          )}
          contentContainerStyle={{ padding: 10, gap: 10 }}
        />
      </YGroup>
    </>
  );
}
