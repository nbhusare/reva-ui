import { Flex } from '@chakra-ui/react';
import { Editor } from '../../RevaEditor';

export const TryIt = () => {
  return (
    <Flex width="100%" minW={500} direction="column">
      <Editor w={'100%'} h={'calc(100vh - 65px)'} mt={25} />
    </Flex>
  );
};
