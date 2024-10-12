import { supabase } from '@/utils/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Stack } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, XStack } from 'tamagui';
import { useAuth } from '@/api/auth';

export default function Settings() {
  const { data: sessionData, isLoading, error } = useAuth();
  if (!sessionData?.session) {
    return <Redirect href={'/'} />;
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <View style={styles.container}>
        <Pressable onPress={async () => await supabase.auth.signOut()}>
          {({ pressed }) => (
            <XStack gap={10} alignItems="center">
              <Text fontSize={20}>Log out</Text>
              <FontAwesome
                name="sign-out"
                size={25}
                color={'red'}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            </XStack>
          )}
        </Pressable>
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
