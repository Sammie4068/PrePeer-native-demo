import { Stack } from 'expo-router';

export default function NotificationsStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Notifications', headerShown: false }} />
    </Stack>
  );
}
