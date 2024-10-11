// import { Toast, useToastController, useToastState } from '@tamagui/toast';
import { YStack, View, Text, Button } from 'tamagui';
import React, { useState } from 'react';
import { Link, Redirect, Stack } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/api/auth';
import InputField from '@/components/InputField';
import { Alert } from 'react-native';

const SignInScreen = () => {
  const { data: sessionData } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  if (sessionData?.session) {
    return <Redirect href={'/'} />;
  }

  async function signin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" gap="$4">
      <Stack.Screen options={{ title: 'Sign In' }} />

      <YStack width="100%" maxWidth={400} paddingHorizontal="$2">
        <Text fontSize="$6" fontWeight="600" marginBottom="$2">
          Email
        </Text>
        <InputField
          placeholder="Jon@gmail.com"
          value={user.email}
          onChangeText={(email: string) => setUser({ ...user, email })}
        />
      </YStack>

      <YStack width="100%" maxWidth={400} paddingHorizontal="$2">
        <Text fontSize="$6" fontWeight="600" marginBottom="$2">
          Password
        </Text>
        <InputField
          placeholder="Password"
          value={user.password}
          onChangeText={(password: string) => setUser({ ...user, password })}
          secureTextEntry
        />
      </YStack>

      <Button onPress={signin} disabled={loading} borderRadius="$3" width="100%" maxWidth={400}>
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>

      <Link href="/sign-up">Create an account</Link>
    </YStack>
  );
};

export default SignInScreen;
