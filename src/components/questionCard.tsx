import { Pressable } from 'react-native';
import { View, Text, XStack, YStack } from 'tamagui';

export default function QuestionCard({
  questionData,
}: {
  questionData: {
    question: string;
    question_number: number;
  };
}) {
  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      })}>
      {({ pressed }) => (
        <XStack padding={16} gap={12} alignItems="center" width="100%">
          <View
            borderWidth={1}
            borderRadius={20}
            width={40}
            height={40}
            alignItems="center"
            justifyContent="center"
            borderColor="$gray8"
            backgroundColor="$gray1">
            <Text color="$gray12" fontWeight="600" fontSize={14}>
              {questionData.question_number}
            </Text>
          </View>

          <Text
            flex={1}
            numberOfLines={2}
            ellipsizeMode="tail"
            fontSize={15}
            lineHeight={20}
            color="#000">
            {questionData.question}
          </Text>
        </XStack>
      )}
    </Pressable>
  );
}
