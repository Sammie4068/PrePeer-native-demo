import { Text } from 'tamagui';
import { View } from 'tamagui';

export default function Badge({ total }: { total: number }) {
  return (
    <View
      width={25}
      height={25}
      borderRadius={10}
      backgroundColor={'white'}
      alignItems="center"
      justifyContent="center">
      <Text color={'black'} fontSize={12} fontWeight={'bold'}>
        {total}
      </Text>
    </View>
  );
}
