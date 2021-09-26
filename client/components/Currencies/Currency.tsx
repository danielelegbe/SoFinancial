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
      justify="space-between"
    >
      <Text fontSize="sm" fontWeight="bold">
        {symbol}
      </Text>
      <Text fontSize="sm">{price && parseFloat(price.toFixed(5))}</Text>
    </HStack>
  );
};

export default Currency;
