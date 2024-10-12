import React from 'react';

import { TextArea } from 'tamagui';

export default function TextAreaField({ ...props }) {
  return (
    <>
      <TextArea
        width="100%"
        borderColor="$borderColor"
        backgroundColor={'#fff'}
        color={'#000'}
        borderWidth={1}
        borderRadius="$3"
        padding="$3"
        {...props}
      />
    </>
  );
}
