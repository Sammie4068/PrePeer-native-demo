import { Button, Input, Separator, XStack } from 'tamagui';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AddExercisesDialog } from './AddExercisesDialog';

export default function TabSearchBar({
  placeholder,
  buttonText,
  groupId,
}: {
  placeholder: string;
  buttonText?: string;
  groupId?: string;
}) {
  return (
    <XStack gap={2}>
      <Input
        backgroundColor={'#fff'}
        color={'#000'}
        flex={1}
        placeholder={placeholder}
        marginBottom={20}
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
