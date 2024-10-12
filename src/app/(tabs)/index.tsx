import { useAuth } from '@/api/auth';
import { Stack } from 'expo-router';
import { Text, XStack, Image, View, Avatar } from 'tamagui';
import { Main, Container } from 'tamagui.config';
import HomeCard from '@/components/homeCard';
import { CreateGroupDialog } from '@/components/CreateGroupDialog';

export default function Home() {
  const { data: sessionData } = useAuth();
  const { username } = sessionData?.user;

  return (
    <Main>
      <Stack.Screen options={{ title: 'Home' }} />
      <XStack m={30} alignItems="center" gap={5}>
        <Text fontSize={20} fontWeight={'700'}>{`Welcome ${username}`}</Text>
      </XStack>

      <XStack alignItems="center" justifyContent="space-around" mt={20}>
        <HomeCard
          imgSrc="https://vymbuvrbafpvkzjlrjon.supabase.co/storage/v1/object/sign/avatars/group-mobile-ui-svgrepo-com.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2dyb3VwLW1vYmlsZS11aS1zdmdyZXBvLWNvbS5wbmciLCJpYXQiOjE3Mjg3MzUyMjQsImV4cCI6MTc0OTY3MzUyMjR9.gzr7bxr6DISkatrsZR0wXH2NHlhv51ELCrSQXhFV05g&t=2024-10-12T12%3A13%3A44.248Z"
          text="Join Group"
        />

        <CreateGroupDialog />
      </XStack>
    </Main>
  );
}
