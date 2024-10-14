import { Stack, useLocalSearchParams } from 'expo-router';
import { Container, Subtitle, Main } from 'tamagui.config';
import { View, Text, Button, Avatar } from 'tamagui';
import { useFetchGroupById } from '@/api/groups';
import ScreenSpinner from '@/components/ScreenSpinner';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useFetchUserById } from '@/api/auth';
import { HorizontalTabs } from '@/components/groupTabs';

export default function groupScreen() {
  const { id: idStr } = useLocalSearchParams();
  const id = typeof idStr === 'string' ? idStr : idStr[0];
  const { data: groupData, isLoading, error } = useFetchGroupById(id);
  const { data: adminData } = useFetchUserById(groupData?.created_by);

  if (!id) return;
  if (isLoading) return <ScreenSpinner />;
  if (error) return <Text m="auto">{error.message}</Text>;

  return (
    <Main>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <View margin={20} gap={10}>
          <Text fontSize={25} fontWeight={'700'}>
            {groupData?.name}
          </Text>

          <Text fontSize={15} fontWeight={'500'} color={'gray'} alignItems="center">
            {groupData?.description}
          </Text>

          <View>
            <View justifyContent="center" gap={5} alignItems="baseline" marginBottom={20}>
              <Text fontWeight={'500'}>Create By</Text>
              <Avatar circular size="$5">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
                <Avatar.Fallback backgroundColor="#000" />
              </Avatar>
              <View justifyContent="center" alignItems="center">
                <Text fontSize={10} fontWeight={'600'} textAlign="center">
                  {adminData?.full_name}
                </Text>
                <Text fontSize={8} color={'grey'} textAlign="center">
                  {adminData?.email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <HorizontalTabs />
      </View>
    </Main>
  );
}
