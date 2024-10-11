import React from 'react';

import { Input } from 'tamagui';

export default function InputField({ ...props }) {
  return (
    <>
      <Input
        width="100%"
        borderColor="$borderColor"
        backgroundColor={'#fff'}
        color={'#000'}
        borderWidth={1}
        padding="$3"
        borderRadius="$3"
        {...props}
      />
    </>
  );
}
