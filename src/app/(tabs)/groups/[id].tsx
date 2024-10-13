import { Stack, useLocalSearchParams } from 'expo-router';
import { Container } from 'tamagui.config';
import { View, Text } from 'tamagui';
import { useFetchGroupById } from '@/api/groups';
import ScreenSpinner from '@/components/ScreenSpinner';

export default function groupScreen() {
  const { id: idStr } = useLocalSearchParams();
  const id = idStr === 'string' ? idStr : idStr[0];

  const { data: groupData, isLoading, error } = useFetchGroupById(id);
  if (isLoading) return <ScreenSpinner />;
  if (error) return <Text m="auto">Failed to fetch groups</Text>;

  if (!id) return;

  return (
    <Container>
      <Stack.Screen options={{ title: id }} />
      <View>
        <Text>{id}</Text>
      </View>
    </Container>
  );
}
