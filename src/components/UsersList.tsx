import { Avatar, View, Text } from 'tamagui';

export default function UsersList({
  img,
  name,
  email,
}: {
  img: string | null;
  name: string;
  email: string;
}) {
  return (
    <View
      flexDirection="row"
      alignItems="center"
      gap={15}
      pressStyle={{ opacity: 0.7 }}
      hoverStyle={{ opacity: 0.7 }}>
      <Avatar circular size="$5">
        <Avatar.Image
          accessibilityLabel="Cam"
          src={
            img ||
            'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80'
          }
        />
        <Avatar.Fallback backgroundColor="#000" />
      </Avatar>
      <View>
        <Text fontWeight="600">{name}</Text>
        <Text color="gray" fontSize={12}>
          {email}
        </Text>
      </View>
    </View>
  );
}
