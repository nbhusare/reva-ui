import { Flex, Select } from '@chakra-ui/react';
import { Example, ExamplesSelectProps } from './Types';

// Revamp the felx props.
export const Examples = ({
  examples,
  onExampleSelect,
  ...flexProps
}: ExamplesSelectProps) => {
  const onOptionSelect = (event) => {
    const source = examples.find(
      (value: Example) => value.name === event.target.value
    );
    onExampleSelect(source === undefined ? '' : source.source);
  };

  return (
    <Flex minW={200} {...flexProps}>
      <Select
        placeholder={'Select Example'}
        onChange={(event) => onOptionSelect(event)}
      >
        {examples.map((example: Example) => {
          const { name } = example;
          return (
            <option value={name} key={name}>
              {name}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
};
