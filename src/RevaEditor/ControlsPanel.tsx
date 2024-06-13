import { Flex, FlexProps, IconButton, IconButtonProps } from '@chakra-ui/react';
import { FaBug, FaPlay, FaStop } from 'react-icons/fa';

export const ControlsPanel = (props: FlexProps) => {
  return (
    <Flex {...props}>
      <ControlButtons />
    </Flex>
  );
};

const ControlButtons = (props: FlexProps) => {
  return (
    <Flex
      {...props}
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
    >
      <ControlButton
        icon={<FaPlay />}
        colorScheme={'blue'}
        aria-label="Run"
        mb="10px"
      />
      <ControlButton
        icon={<FaStop />}
        colorScheme={'red'}
        aria-label="Stop"
        mb="10px"
      />
      <ControlButton
        icon={<FaBug />}
        colorScheme={'green'}
        aria-label="Debug"
      />
    </Flex>
  );
};

const ControlButton = (props: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      h="20px"
      w="20px"
      fontSize="10px"
      minWidth="20px"
      rounded={'unset'}
    />
  );
};
