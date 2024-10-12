import { Stack } from 'expo-router';

export default function GroupsStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Groups', headerShown: false }} />
    </Stack>
  );
}
