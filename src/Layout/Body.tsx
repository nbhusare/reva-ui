import { Flex, FlexProps } from '@chakra-ui/react';
import { LeftNavigation } from './LeftNavigation/LeftNavigation';
import { ContentPanel } from './ContentPanel/ContentPanel';

export const Body = (props: FlexProps) => {
  return (
    <Flex width="100%" {...props}>
      <LeftNavigation />
      <ContentPanel h="100vh" />
    </Flex>
  );
};
