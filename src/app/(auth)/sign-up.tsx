import { Toast, useToastController, useToastState } from '@tamagui/toast';
import { YStack, View, Text, Input, Button, Spinner } from 'tamagui';
import React, { useState } from 'react';
import { Link, Redirect, Stack } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { useAuth, useSignUp } from '@/api/auth';
import InputField from '@/components/InputField';
import { Alert } from 'react-native';

const SignInScreen = () => {
  const { data: sessionData } = useAuth();
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // const [loading, setLoading] = useState(false);
  const { mutate: signUp, isPending } = useSignUp();

  if (sessionData?.session) {
    return <Redirect href={'/'} />;
  }

  function validateConfirmPassword() {
    if (user.confirmPassword !== user.password) {
      // <Toast>
      //   <YStack>
      //     <Toast.Title>Confirm Password doesn't match Password</Toast.Title>
      //     <Toast.Description>
      //       Make sure that the Confirm Password input mathes the inputed Password
      //     </Toast.Description>
      //     <Toast.Close />
      //   </YStack>
      // </Toast>;
      Alert.alert("Confirm Password doesn't match Password");

      return false;
    }
    return true;
  }

  async function signup() {
    if (!validateConfirmPassword()) {
      return;
    }
    signUp(user, {
      onError: (error) => {
        Alert.alert(error.message);
      },
    });
    setUser({ fullname: '', email: '', password: '', confirmPassword: '' });
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" gap="$4">
      <Stack.Screen options={{ title: 'Sign Up' }} />

      <YStack width="100%" maxWidth={400} paddingHorizontal="$2">
        <Text fontSize="$6" fontWeight="600" marginBottom="$2">
          Full Name
        </Text>
        <InputField
          placeholder="Jon"
          value={user.fullname}
          onChangeText={(fullname: string) => setUser({ ...user, fullname })}
        />
      </YStack>
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

      <YStack width="100%" maxWidth={400} paddingHorizontal="$2">
        <Text fontSize="$6" fontWeight="600" marginBottom="$2">
          Confirm Password
        </Text>
        <InputField
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChangeText={(confirmPassword: string) => setUser({ ...user, confirmPassword })}
          secureTextEntry
        />
      </YStack>

      <Button onPress={signup} disabled={isPending} borderRadius="$3" width="100%" maxWidth={400}>
        {isPending ? <Spinner color={'#fff'} /> : 'Create Account'}
      </Button>

      <Link href="/sign-in">Sign in</Link>
    </YStack>
  );
};

export default SignInScreen;
