import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet,
  TooltipSimple,
  Unspaced,
  XStack,
} from 'tamagui';
import HomeCard from './homeCard';

export function CreateGroupDialog() {
  return <DialogInstance />;
}

function DialogInstance() {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <HomeCard
          imgSrc="https://vymbuvrbafpvkzjlrjon.supabase.co/storage/v1/object/sign/avatars/group-add-people-svgrepo-com.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2dyb3VwLWFkZC1wZW9wbGUtc3ZncmVwby1jb20ucG5nIiwiaWF0IjoxNzI4NzM1MjUxLCJleHAiOjE3NDk2NzM1MjUxfQ.W6r4vgFP4tNPFGTns8SOofhg0jaVO-871LF4EHDmzOI&t=2024-10-12T12%3A14%3A11.615Z"
          text="Create Group"
        />
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="quick" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
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
          <Dialog.Title>Create Group</Dialog.Title>
          <Dialog.Description>Add group name and description to get started</Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Name
            </Label>
            <Input flex={1} id="name" />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Description
            </Label>
            <Input flex={1} id="description" />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            <DialogInstance />

            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Create
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <FontAwesome
                name="close"
                color="black"
                position="absolute"
                top="$3"
                right="$3"
                size={20}
                circular
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
