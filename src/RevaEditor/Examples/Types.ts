import { FlexProps } from '@chakra-ui/react';

export interface Example {
  name: string;
  source?: string;
}

export interface ExamplesSelectProps extends FlexProps {
  examples: Example[];
  onExampleSelect: (source: string) => void;
}

export const revaExamples: Example[] = [
  {
    name: 'Example 1',
    source: 'print "Hello World"',
  },
  {
    name: 'Example 2',
    source: 'print "Hello World example 2"',
  },
];
