import { Flex, FlexProps } from '@chakra-ui/react';
import { NavigationItem } from './NavigationItem';

export const LeftNavigation = (props: FlexProps) => {
  return (
    <Flex minW={300} {...props} direction={'column'}>
      <NavigationItem
        collapsible={false}
        text="Home"
        routeTo="/"
      ></NavigationItem>
      <NavigationItem
        collapsible={true}
        text="Try It"
        routeTo="/tryit"
      ></NavigationItem>
    </Flex>
  );
};
