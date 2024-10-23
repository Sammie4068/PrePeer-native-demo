import { Link, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Text, View } from 'tamagui';

export default function ExercisesList({
  title,
  date,
  questionCount,
  id,
  groupId,
}: {
  title: string;
  date: string;
  questionCount: number;
  id: string;
  groupId: string | undefined;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/arena/exercise`,
          params: { id, groupId },
        })
      }
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          backgroundColor: 'white',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
      ]}>
      {({ pressed }) => (
        <View
          borderRadius={10}
          paddingVertical={10}
          paddingHorizontal={15}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          backgroundColor={pressed ? '#f0f0f0' : 'white'}>
          <View>
            <Text fontSize={16} fontWeight={'600'}>
              {title}
            </Text>
            <Text color={'gray'}>{`${questionCount} Questions`}</Text>
          </View>
          <Text>{new Date(date).getFullYear()}</Text>
        </View>
      )}
    </Pressable>
  );
}
