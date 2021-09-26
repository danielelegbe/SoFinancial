import { CircularProgress, Flex, HStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Currency from './Currency';

export interface ICurrency {
  s?: string;
  p?: number;
}

const Currencies = () => {
  const [BTC, setBTC] = useState<ICurrency | null>(null);
  const [GBPUSD, setGBPUSD] = useState<ICurrency | null>(null);
  const [EURUSD, setEURUSD] = useState<ICurrency | null>(null);

  useEffect(() => {
    const socket = io();
    axios('/api/currencies').finally(() => {
      io('/');
    });
    socket.on('connect', () => console.log('connect'));
    socket.on('currencies', (data) => {
      const currencies = JSON.parse(data);
      //   console.log(currencies);

      if (currencies?.data) {
        const BTC: ICurrency = currencies.data.find(
          (currency: ICurrency) => currency.s === 'BINANCE:BTCUSDT'
        );
        const GBPUSD: ICurrency = currencies.data.find(
          (currency: ICurrency) => currency.s === 'OANDA:GBP_USD'
        );
        const EURUSD: ICurrency = currencies.data.find(
          (currency: ICurrency) => currency.s === 'OANDA:EUR_USD'
        );
        BTC && setBTC(BTC);
        GBPUSD && setGBPUSD(GBPUSD);
        EURUSD && setEURUSD(EURUSD);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Flex justify="center" boxShadow="md" h="5vh" align="center" bg="gray.100">
      {!BTC && <CircularProgress isIndeterminate color="blue.700" />}
      <HStack spacing={5}>
        {BTC && <Currency {...BTC} />}
        {GBPUSD && <Currency {...GBPUSD} />}
        {EURUSD && <Currency {...EURUSD} />}
      </HStack>
    </Flex>
  );
};

export default Currencies;
