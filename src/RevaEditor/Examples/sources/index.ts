export const revaExamples: RevaExample[] = [
  {
    name: 'Example 1',
    source: 'print "Hello World"',
  },
  {
    name: 'Example 2',
    source: 'print "Hello World example 2"',
  },
];

export type RevaExample = {
  source: string;
  name: string;
};
