import { Pressable } from 'react-native';
import { Card, Image, Text } from 'tamagui';

export default function HomeCard({ imgSrc, text }: { imgSrc: string; text: string }) {
  return (
    <Pressable onPress={() => console.log(text)}>
      {({ pressed }) => (
        <Card
          elevate
          py={10}
          width={200}
          height={200}
          backgroundColor={'#fff'}
          scale={0.9}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.825 }}
          animation="bouncy">
          <Card.Header alignItems="center" justifyContent="center">
            <Image
              source={{ uri: imgSrc }}
              alt={text}
              style={{ opacity: pressed ? 0.5 : 1 }}
              width={100}
              height={100}
            />
          </Card.Header>
          <Card.Footer alignItems="center" justifyContent="center">
            <Text fontSize={15} fontWeight={'500'}>
              {text}
            </Text>
          </Card.Footer>
        </Card>
      )}
    </Pressable>
  );
}
