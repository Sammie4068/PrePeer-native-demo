import { Button, Input, Separator, XStack } from 'tamagui';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AddExercisesDialog } from './AddExercisesDialog';
import InputField from './InputField';

export default function TabSearchBar({
  placeholder,
  buttonText,
  groupId,
  value,
  onChange,
}: {
  placeholder: string;
  buttonText?: string;
  groupId?: string;
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <XStack gap={2}>
      <InputField
        flex={1}
        placeholder={placeholder}
        marginBottom={20}
        value={value}
        onChangeText={onChange}
      />
      {buttonText && (
        <AddExercisesDialog
          groupId={groupId ?? ''}
          trigger={
            <Button color={'#fff'} borderColor={'#000'}>
              <FontAwesome6 name="add" size={24} color="#fff" />
              {buttonText}
            </Button>
          }
        />
      )}
    </XStack>
  );
}
