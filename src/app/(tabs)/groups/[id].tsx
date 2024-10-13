import { Stack, useLocalSearchParams } from 'expo-router';
import { Container } from 'tamagui.config';
import { View, Text } from 'tamagui';
import { useFetchGroupById } from '@/api/groups';
import ScreenSpinner from '@/components/ScreenSpinner';

export default function groupScreen() {
  const { id: idStr } = useLocalSearchParams();
  const id = typeof idStr === 'string' ? idStr : idStr[0];

  if (!id) return;
  const { data: groupData, isLoading, error } = useFetchGroupById(id);
  if (isLoading) return <ScreenSpinner />;
  if (error) return <Text m="auto">{error.message}</Text>;

  return (
    <Container>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Text>{groupData?.name}</Text>
      </View>
    </Container>
  );
}
