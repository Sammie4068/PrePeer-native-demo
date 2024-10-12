import { useAuth } from '@/api/auth';
import { Stack } from 'expo-router';
import { Text, XStack, Image, View } from 'tamagui';
import { Main, Container } from 'tamagui.config';
import HomeCard from '@/components/homeCard';

export default function Home() {
  const { data: sessionData } = useAuth();
  const { username } = sessionData?.user;

  return (
    <Main>
      <Stack.Screen options={{ title: 'Home' }} />
      <View m={30}>
        <Text fontSize={20} fontWeight={'700'}>{`Welcome ${username}`}</Text>
      </View>

      <XStack alignItems="center" justifyContent="center" gap={5} mt={20}>
        <HomeCard
          imgSrc="https://vymbuvrbafpvkzjlrjon.supabase.co/storage/v1/object/sign/avatars/group-mobile-ui-svgrepo-com.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2dyb3VwLW1vYmlsZS11aS1zdmdyZXBvLWNvbS5wbmciLCJpYXQiOjE3Mjg3MzUyMjQsImV4cCI6MTc0OTY3MzUyMjR9.gzr7bxr6DISkatrsZR0wXH2NHlhv51ELCrSQXhFV05g&t=2024-10-12T12%3A13%3A44.248Z"
          text="Join Group"
        />
        <HomeCard
          imgSrc="https://vymbuvrbafpvkzjlrjon.supabase.co/storage/v1/object/sign/avatars/group-add-people-svgrepo-com.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2dyb3VwLWFkZC1wZW9wbGUtc3ZncmVwby1jb20ucG5nIiwiaWF0IjoxNzI4NzM1MjUxLCJleHAiOjE3NDk2NzM1MjUxfQ.W6r4vgFP4tNPFGTns8SOofhg0jaVO-871LF4EHDmzOI&t=2024-10-12T12%3A14%3A11.615Z"
          text="Create Group"
        />
      </XStack>
    </Main>
  );
}
