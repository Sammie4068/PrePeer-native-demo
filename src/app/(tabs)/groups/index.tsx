import { useFetchGroups } from '@/api/groups';
import { Stack } from 'expo-router';
import { FlatList } from 'react-native';
import { View, Text, Spinner } from 'tamagui';

export default function Groups() {
  const { data: groups, isLoading, error } = useFetchGroups();

  if (isLoading)
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Spinner color={'#000'} />
      </View>
    );
  if (error) return <Text>Failed to fetch groups</Text>;
  if (!groups || groups.length < 1)
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={'$9'}>No Groups</Text>
      </View>
    );

  return (
    <>
      <Stack.Screen options={{ title: 'Groups' }} />
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <>
            <Text>{item.name}</Text>
          </>
        )}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </>
  );
}
