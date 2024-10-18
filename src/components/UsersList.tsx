import { Avatar, View, Text } from 'tamagui';
import type { Member } from '@/utils/types';

export default function UsersList({
  img,
  name,
  email,
  isAdmin,
}: {
  img: string | null;
  name: string;
  email: string;
  isAdmin: boolean | null;
}) {
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pressStyle={{ opacity: 0.7 }}
      hoverStyle={{ opacity: 0.7 }}>
      <View flexDirection="row" alignItems="center" gap={15}>
        <Avatar circular size="$5">
          <Avatar.Image
            accessibilityLabel={name}
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
      <Text fontWeight={'500'}>{isAdmin && 'Admin'}</Text>
    </View>
  );
}
