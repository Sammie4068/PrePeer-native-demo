import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'tamagui';

export default function ExercisePage() {
  const { id: idStr } = useLocalSearchParams();
  const exerciseId = typeof idStr === 'string' ? idStr : idStr[0];

  return (
    <View>
      <Text>{exerciseId}</Text>
    </View>
  );
}
