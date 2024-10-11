import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'tamagui';

export default function Settings() {
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <View style={styles.container}>
        <Text>Settings Screen</Text>
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
