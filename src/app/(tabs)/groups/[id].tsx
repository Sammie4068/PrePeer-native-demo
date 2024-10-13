import { Stack, useLocalSearchParams } from 'expo-router';
import { Container, Subtitle } from 'tamagui.config';
import { View, Text, Button, Avatar } from 'tamagui';
import { useFetchGroupById } from '@/api/groups';
import ScreenSpinner from '@/components/ScreenSpinner';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { useFetchUserById } from '@/api/auth';

export default function groupScreen() {
  const { id: idStr } = useLocalSearchParams();
  const id = typeof idStr === 'string' ? idStr : idStr[0];
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: groupData, isLoading, error } = useFetchGroupById(id);
  const { data: adminData } = useFetchUserById(groupData?.admin_id);
  console.log('🚀 ~ groupScreen ~ adminData:', adminData);

  // const toggleDescription = () => setShowFullDescription(!showFullDescription);

  if (!id) return;
  if (isLoading) return <ScreenSpinner />;
  if (error) return <Text m="auto">{error.message}</Text>;

  return (
    <Container>
      <Stack.Screen options={{ headerShown: false }} />
      <View gap={10}>
        <Text fontSize={25} fontWeight={'700'}>
          {groupData?.name}
        </Text>

        <Text fontSize={15} fontWeight={'500'} color={'gray'} alignItems="center">
          {groupData?.description}
          {/* {showFullDescription
            ? groupData?.description
            :  `${groupData?.description.slice(0, 100)}...`}
          <Pressable onPress={toggleDescription}>
            <Text color={'#000'} fontWeight={'500'} alignItems='center'>
              {showFullDescription ? 'See less' : 'See more'}
            </Text>
          </Pressable> */}
        </Text>

        <View justifyContent="center" gap={5}>
          <Text fontWeight={'500'}>Create By</Text>
          <Avatar circular size="$5">
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="#000" />
          </Avatar>

          {/* <Text fontSize={10} fontWeight={'600'} marginLeft={5}>
            {adminData?.username}
          </Text>
          <Text fontSize={8} color={'grey'}>
            {adminData?.email}
          </Text> */}
        </View>
      </View>
    </Container>
  );
}
