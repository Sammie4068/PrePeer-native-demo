import React, { forwardRef } from 'react';
import { Card, Image, Text, GetProps } from 'tamagui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type CardProps = GetProps<typeof Card>;

interface HomeCardProps extends Omit<CardProps, 'children'> {
  // imgSrc: string;
  icon: React.ReactNode;
  text: string;
}

const HomeCard = forwardRef<React.ElementRef<typeof Card>, HomeCardProps>(
  ({ icon, text, ...props }, ref) => {
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
        {...props}
        ref={ref}>
        <Card.Header alignItems="center" justifyContent="center">
          {/* <Image source={{ uri: imgSrc }} alt={text} width={100} height={100} /> */}
          {icon}
        </Card.Header>
        <Card.Footer alignItems="center" justifyContent="center">
          <Text fontSize={15} fontWeight={'600'}>
            {text}
          </Text>
        </Card.Footer>
      </Card>
    );
  }
);

HomeCard.displayName = 'HomeCard';

export default HomeCard;
