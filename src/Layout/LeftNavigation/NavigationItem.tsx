import {
  Box,
  Button,
  ButtonProps,
  Collapse,
  Flex,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export interface NavigationItemProps {
  collapsible: boolean;
  text: string;
  routeTo?: string;
  collapsibleItems?: NonCollapsibleItemProps[];
}

interface CollapsibleItemProps extends ButtonProps {
  text: string;
  routeTo: string;
  items: NonCollapsibleItemProps[];
}

interface NonCollapsibleItemProps extends ButtonProps {
  text: string;
  routeTo?: string;
}

interface NavigationButtonProps extends ButtonProps {
  text: string;
}

export const NavigationItem = (props: NavigationItemProps) => {
  const { collapsible, text, routeTo, collapsibleItems } = props;
  return collapsible ? (
    <CollapsibleItem
      items={collapsibleItems ?? []}
      text={text}
      routeTo={routeTo}
      w={275}
      marginLeft={150}
    />
  ) : (
    <NonCollapsibleItem
      text={text}
      routeTo={routeTo}
      w={275}
      marginLeft={150}
    />
  );
};

const NonCollapsibleItem = ({
  text,
  routeTo,
  ...rest
}: NonCollapsibleItemProps) => {
  const navigate = useNavigate();

  return (
    <NavigationButton text={text} onClick={() => navigate(routeTo)} {...rest} />
  );
};

const CollapsibleItem = ({
  items,
  text,
  routeTo,
  ...rest
}: CollapsibleItemProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const onClick = () => {
    if (routeTo) {
      navigate(routeTo);
    }
    onToggle();
  };

  return (
    <Flex direction={'column'}>
      <NavigationButton onClick={onClick} text={text} {...rest} />
      <Collapse in={isOpen} animateOpacity>
        {items.map((itemProps: NonCollapsibleItemProps) => {
          return (
            <NonCollapsibleItem
              text={itemProps.text}
              routeTo={itemProps.routeTo}
              key={itemProps.text}
              width={200}
            />
          );
        })}
      </Collapse>
    </Flex>
  );
};

const NavigationButton = ({
  onClick,
  text,
  w,
  width,
}: NavigationButtonProps) => {
  return (
    <Button
      onClick={onClick}
      w={w}
      width={width}
      variant="ghost"
      justifyContent={'flex-start'}
    >
      <Box alignItems="baseline" w="100%">
        <HStack w="100%">
          <Box w="200px" textAlign="start" p="20px">
            {text}
          </Box>
          <Box>
            <LuChevronDown />
          </Box>
        </HStack>
      </Box>
    </Button>
  );
};
