import { Pressable } from 'react-native';
import { Text, View } from 'tamagui';

export default function ExercisesList() {
  return (
    <Pressable
      onPress={() => console.log('Pressing issues')}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}>
      {({ pressed }) => (
        <View
          borderWidth={1}
          borderRadius={10}
          borderBlockColor={'#000'}
          paddingVertical={10}
          paddingHorizontal={15}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          backgroundColor={pressed ? '#f0f0f0' : 'white'}>
          <View>
            <Text fontSize={18} fontWeight={'600'}>
              CYB 400 Examination
            </Text>
            <Text color={'gray'}>30 Questions</Text>
          </View>
          <Text>2020</Text>
        </View>
      )}
    </Pressable>
  );
}
