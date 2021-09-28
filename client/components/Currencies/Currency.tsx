import { MinusIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { ComponentWithAs, HStack, IconProps, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setLastPrice } from '../../features/currencies/currenciesSlice';
import { ICurrency } from './AllCurrencies';

const Currency = ({ s: symbol, p: price }: ICurrency) => {
  const [textColor, setTextColor] = useState('');
  const [icon, setIcon] = useState(<MinusIcon />);
  const dispatch = useDispatch();

  const { p: lastPrice } = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    if (!lastPrice || lastPrice === price) {
      setTextColor('black');
      setIcon(<MinusIcon boxSize={3} />);
    } else {
      if (price && price > lastPrice) {
        setTextColor('green');
        setIcon(<TriangleUpIcon color="green" boxSize={3} />);
      } else {
        setTextColor('red');
        setIcon(<TriangleDownIcon color="red" boxSize={3} />);
      }
    }
    price && dispatch(setLastPrice(price));
  }, [price]);

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
      <Text fontSize="sm" color={textColor}>
        {price && parseFloat(price.toFixed(5))}
      </Text>
      {icon}
    </HStack>
  );
};

export default Currency;
