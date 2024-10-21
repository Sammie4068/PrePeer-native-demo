import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'tamagui';

export default function ExercisePage() {
  const searchItems = useLocalSearchParams();
  console.log(searchItems);

  return (
    <View>
      <Text>Exercise Page</Text>
    </View>
  );
}
