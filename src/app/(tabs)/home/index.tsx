import { useAuth } from '@/api/auth';
import { Link, Stack } from 'expo-router';
import { Text, XStack } from 'tamagui';
import { Main } from 'tamagui.config';
import HomeCard from '@/components/homeCard';
import { CreateGroupDialog } from '@/components/CreateGroupDialog';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Home() {
  const { data: sessionData } = useAuth();
  const fullname = sessionData?.user?.full_name;

  return (
    <Main>
      <Stack.Screen options={{ title: 'Home' }} />
      <XStack m={30} alignItems="center" gap={5}>
        <Text fontSize={20} fontWeight={'700'}>{`Welcome ${fullname}`}</Text>
      </XStack>

      <XStack alignItems="center" justifyContent="space-around" mt={20}>
        <Link href={'/(tabs)/groups'} asChild>
          <HomeCard
            // imgSrc="https://vymbuvrbafpvkzjlrjon.supabase.co/storage/v1/object/sign/avatars/group-mobile-ui-svgrepo-com.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2dyb3VwLW1vYmlsZS11aS1zdmdyZXBvLWNvbS5wbmciLCJpYXQiOjE3Mjg3MzUyMjQsImV4cCI6MTc0OTY3MzUyMjR9.gzr7bxr6DISkatrsZR0wXH2NHlhv51ELCrSQXhFV05g&t=2024-10-12T12%3A13%3A44.248Z"
            text="Join Group"
            icon={<MaterialIcons name="group-add" size={50} color="black" />}
          />
        </Link>

        <CreateGroupDialog
          trigger={
            <HomeCard
              // imgSrc="https://vymbuvrbafpvkzjlrjon.supabase.co/storage/v1/object/sign/avatars/group-add-people-svgrepo-com.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2dyb3VwLWFkZC1wZW9wbGUtc3ZncmVwby1jb20ucG5nIiwiaWF0IjoxNzI4NzM1MjUxLCJleHAiOjE3NDk2NzM1MjUxfQ.W6r4vgFP4tNPFGTns8SOofhg0jaVO-871LF4EHDmzOI&t=2024-10-12T12%3A14%3A11.615Z"
              text="Create Group"
              icon={<FontAwesome6 name="people-group" size={50} color="black" />}
            />
          }
        />
      </XStack>
    </Main>
  );
}
