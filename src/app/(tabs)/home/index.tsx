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
            text="Join Group"
            icon={<MaterialIcons name="group-add" size={50} color="black" />}
          />
        </Link>

        <CreateGroupDialog
          trigger={
            <HomeCard
              text="Create Group"
              icon={<FontAwesome6 name="people-group" size={50} color="black" />}
            />
          }
        />
      </XStack>
    </Main>
  );
}
