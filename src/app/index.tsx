import { useAuth } from '@/api/auth';
import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { View, Text } from 'tamagui';

export default function Index() {
  const { data: sessionData, isLoading, error } = useAuth();
  if (isLoading) <ActivityIndicator />;

  if (!sessionData?.session) {
    return <Redirect href={'/(auth)/sign-in'} />;
  }
  if (isLoading) return <ActivityIndicator />;
  if (error)
    return (
      <View margin="auto">
        <Text>Something went wrong... Try again</Text>
      </View>
    );

  return <Redirect href={'/(tabs)/home'} />;
}
