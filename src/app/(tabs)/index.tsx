import { useAuth } from '@/api/auth';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'tamagui';
import { Title } from 'tamagui.config';

export default function Home() {
  const { data: sessionData } = useAuth();
  const { username } = sessionData?.user;

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <Text fontSize={20} fontWeight={'700'}>{`Welcome ${username}`}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
