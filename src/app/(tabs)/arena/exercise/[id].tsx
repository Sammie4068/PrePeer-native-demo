import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'tamagui';

export default function ExercisePage() {
  const { id, groupId } = useLocalSearchParams();

  return (
    <View>
      <Text>exercise-id: {id}</Text>
      <Text>group-id: {groupId}</Text>
    </View>
  );
}
