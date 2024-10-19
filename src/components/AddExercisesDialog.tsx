import React, { ReactElement, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Adapt, Button, Dialog, Sheet, Unspaced, XStack, YStack, Text, Spinner } from 'tamagui';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import { useAuth } from '@/api/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAddExercise } from '@/api/exercises';

dayjs.extend(relativeTime);

interface CreateGroupDialogProps {
  trigger: ReactElement;
  groupId: string;
}

export function AddExercisesDialog({ trigger, groupId }: CreateGroupDialogProps) {
  const { data: sessionData } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const user_id = sessionData?.session?.user.id;

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const { mutate: addExercise, isPending, error: addError } = useAddExercise();

  const handleAddExercise = () => {
    addExercise(
      {
        title,
        date: date.toISOString(),
        created_by: user_id,
        group_id: groupId,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="quick" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4" theme="light">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="lazy"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4">
          <Dialog.Title theme={'light'}>Add Exercise</Dialog.Title>
          <Dialog.Description
            theme={'light'}
            style={{
              fontSize: 15,
              color: 'red',
            }}></Dialog.Description>

          <YStack width="100%" maxWidth={400} paddingHorizontal="$2">
            <Text fontSize="$6" fontWeight="600" marginBottom="$2">
              Title
            </Text>
            <InputField value={title} onChangeText={(title: string) => setTitle(title)} />
          </YStack>
          <YStack width="100%" maxWidth={400} paddingHorizontal="$2">
            <Text fontSize="$6" fontWeight="600" marginBottom="$2">
              Exercise Date (Optional)
            </Text>
            <Pressable onPress={showDatepicker}>
              <InputField value={date.toDateString()} disabled />
            </Pressable>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </YStack>
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Cancel
              </Button>
            </Dialog.Close>
            <Button theme="active" aria-label="Add" onPress={handleAddExercise}>
              {isPending ? <Spinner color={'#fff'} /> : 'Add'}
            </Button>
          </XStack>
          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={<FontAwesome name="close" />}
                aria-label="Close"
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
