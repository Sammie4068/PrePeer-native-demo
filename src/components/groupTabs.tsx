import React from 'react';
import type { TabsContentProps } from 'tamagui';
import { H5, Separator, SizableText, Tabs } from 'tamagui';

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="white"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="white"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}>
      {props.children}
    </Tabs.Content>
  );
};

export const HorizontalTabs = () => {
  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={'100%'}
      height={500}
      backgroundColor={'white'}
      borderRadius="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor">
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Manage your account">
        <Tabs.Tab flex={1} value="tab1">
          <SizableText fontFamily="$body">Exercise (10)</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="tab2">
          <SizableText fontFamily="$body">Members (10)</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator />
      <TabsContent value="tab1">
        <H5>Exercise</H5>
      </TabsContent>

      <TabsContent value="tab2">
        <H5>Members</H5>
      </TabsContent>
    </Tabs>
  );
};
