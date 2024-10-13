import { Spinner, View } from 'tamagui';

export default function ScreenSpinner() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Spinner color={'#000'} />
    </View>
  );
}
