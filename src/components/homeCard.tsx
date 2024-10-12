import React from 'react';
import { Card, Image, Text } from 'tamagui';

interface HomeCardProps {
  imgSrc: string;
  text: string;
}

const HomeCard = React.forwardRef<HTMLDivElement, HomeCardProps>(({ imgSrc, text }, ref) => {
  return (
    <Card
      elevate
      py={10}
      width={150}
      height={150}
      backgroundColor={'#fff'}
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.825 }}
      animation="bouncy"
      ref={ref}>
      <Card.Header alignItems="center" justifyContent="center">
        <Image source={{ uri: imgSrc }} alt={text} width={100} height={100} />
      </Card.Header>
      <Card.Footer alignItems="center" justifyContent="center">
        <Text fontSize={15} fontWeight={'600'}>
          {text}
        </Text>
      </Card.Footer>
    </Card>
  );
});

HomeCard.displayName = 'HomeCard';

export default HomeCard;
