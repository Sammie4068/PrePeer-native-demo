import { Stack } from 'expo-router';
import { Text, View } from 'tamagui';

export default function Exercise() {
  return (
    <>
      <Stack.Screen options={{ title: 'Exercise' }} />
      <View flex={1} p={24}>
        <Text>Exercises</Text>
      </View>
    </>
  );
}
