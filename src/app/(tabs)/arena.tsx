import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'tamagui';

export default function Arena() {
  return (
    <>
      <Stack.Screen options={{ title: 'Arena' }} />
      <View style={styles.container}>
        <Text>Arena Screen</Text>
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
