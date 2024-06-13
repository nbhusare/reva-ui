import { Flex } from '@chakra-ui/react';
import { Header } from './Header';
import { Body } from './Body';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <Flex direction="column">
      <Header h="65px" />
      <Flex direction="column" mt={65} h={`calc(100vh - 65px)`}>
        <Body h="100vh" />
        {/* <Footer /> */}
      </Flex>
    </Flex>
  );
};
