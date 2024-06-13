import { Flex, FlexProps } from '@chakra-ui/react';

export const Header = (props: FlexProps) => {
  return <Flex as="header" position="fixed" width="100%" {...props} />;
};
