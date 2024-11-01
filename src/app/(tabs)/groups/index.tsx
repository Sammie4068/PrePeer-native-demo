import { useFetchGroups } from '@/api/groups';
import ScreenSpinner from '@/components/ScreenSpinner';
import { Link, Stack } from 'expo-router';
import { FlatList } from 'react-native';
import { View, Text, YGroup, Separator, ListItem } from 'tamagui';
import Badge from '@/components/Badge';

export default function Groups() {
  const { data: groups, isLoading, error } = useFetchGroups();

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
      <YGroup size="$5" separator={<Separator />}>
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <YGroup.Item>
              <Link href={`/(tabs)/groups/${item.id}`} asChild>
                <ListItem
                  hoverTheme
                  pressTheme
                  title={item.name}
                  subTitle={item.description}
                  iconAfter={<Badge total={item.totalUsers} />}
                />
              </Link>
            </YGroup.Item>
          )}
          contentContainerStyle={{ padding: 10, gap: 10 }}
        />
      </YGroup>
    </>
  );
}
