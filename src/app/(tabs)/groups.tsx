import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'tamagui';

export default function Groups() {
  return (
    <>
      <Stack.Screen options={{ title: 'Groups' }} />
      <View style={styles.container}>
        <Text>Groups Screen</Text>
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
