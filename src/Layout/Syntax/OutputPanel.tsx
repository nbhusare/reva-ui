import { Box, Flex, FlexProps } from '@chakra-ui/react';

export const OutputPanel = (props: FlexProps) => {
  return (
    <Flex {...props}>
      <Box bg="rgb(0, 0, 0)" w="100%"></Box>
    </Flex>
  );
};
