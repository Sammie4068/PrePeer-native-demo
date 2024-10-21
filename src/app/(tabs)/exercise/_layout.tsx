import { Stack } from 'expo-router';

export default function ExerciseStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'exercise', headerShown: false }} />
    </Stack>
  );
}
