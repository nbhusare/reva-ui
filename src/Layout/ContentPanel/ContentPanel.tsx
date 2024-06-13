import { Flex, FlexProps } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../Home';
import { Syntax } from '../Syntax';
import { TryIt } from '../TryIt';
import { ExampleProps } from '../TryIt/Types';

export const ContentPanel = (props: FlexProps) => {
  const examples: ExampleProps[] = [
    {
      name: 'Example1',
      source: 'print 1234;',
    },
    {
      name: 'Example2',
      source: 'print <something Goes here>;',
    },
  ];

  return (
    <Flex width="100%" minW={500} {...props}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tryit" element={<TryIt examples={examples} />} />
        {/* <Route path="/syntax" element={<Syntax h="100vh" />} /> */}
      </Routes>
    </Flex>
  );
};
