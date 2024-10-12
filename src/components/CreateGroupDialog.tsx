import React, { ReactElement, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Sheet,
  Unspaced,
  XStack,
  YStack,
  Text,
} from 'tamagui';
import InputField from './InputField';
import TextAreaField from './TextAreaField';

interface GroupData {
  name: string;
  description: string;
}

interface CreateGroupDialogProps {
  trigger: ReactElement;
  onCreateGroup: (groupData: GroupData) => void;
}

export function CreateGroupDialog({ trigger, onCreateGroup }: CreateGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleCreateGroup = () => {
    onCreateGroup({ name: groupName, description: groupDescription });
    setOpen(false);
    setGroupName('');
    setGroupDescription('');
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
          <Dialog.Title theme={'light'}>Create Group</Dialog.Title>
          <Dialog.Description theme={'light'}>
            Add group name and description to get started
          </Dialog.Description>

          <YStack width="100%" maxWidth={400} paddingHorizontal="$2">
            <Text fontSize="$6" fontWeight="600" marginBottom="$2">
              Name
            </Text>
            <InputField value={groupName} onChangeText={setGroupName} />
          </YStack>
          <YStack width="100%" maxWidth={400} paddingHorizontal="$2">
            <Text fontSize="$6" fontWeight="600" marginBottom="$2">
              Description
            </Text>
            <TextAreaField value={groupDescription} onChangeText={setGroupDescription} />
          </YStack>
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Cancel
              </Button>
            </Dialog.Close>
            <Button theme="active" aria-label="Create" onPress={handleCreateGroup}>
              Create
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
                icon={<FontAwesome name="sign-out" />}
                aria-label="Close"
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
