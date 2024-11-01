import { Stack } from 'expo-router';

export default function ArenaStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Arena', headerShown: false }} />
      <Stack.Screen name="exercise/index" options={{ headerShown: false }} />
    </Stack>
  );
}
