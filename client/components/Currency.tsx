import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { ICurrency } from './AllCurrencies';

const Currency = ({ s: symbol, p: price }: ICurrency) => {
  return (
    <HStack
      border="1px"
      borderColor="gray.200"
      rounded="md"
      boxShadow="md"
      p={3}
      px={4}
      justify="space-between"
    >
      <Text size="sm" fontWeight="bold">
        {symbol}
      </Text>
      <Text size="sm">{price}</Text>
    </HStack>
  );
};

export default Currency;
