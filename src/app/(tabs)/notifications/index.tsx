import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'tamagui';

export default function Notifications() {
  return (
    <>
      <Stack.Screen options={{ title: 'Notifications' }} />
      <View style={styles.container}>
        <Text>Notifications Screen</Text>
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
