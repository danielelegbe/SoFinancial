import { CircularProgress, Flex, HStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Currency from './Currency';

export interface ICurrency {
  s?: string;
  p?: number | null;
}

const Currencies = () => {
  const [BTC, setBTC] = useState<ICurrency | null>(null);
  const [GBPUSD, setGBPUSD] = useState<ICurrency | null>(null);
  const [EURUSD, setEURUSD] = useState<ICurrency | null>(null);
  const [APPLE, setAPPLE] = useState<ICurrency | null>(null);
  const [TESLA, setTESLA] = useState<ICurrency | null>(null);

  useEffect(() => {
    const socket = io();
    axios('/api/currencies').then(() => {
      io('/');
    });
    socket.on('currencies', (data) => {
      const currencies = JSON.parse(data);

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
        const APPLE: ICurrency = currencies.data.find(
          (currency: ICurrency) => currency.s === 'AAPL'
        );
        const TESLA: ICurrency = currencies.data.find(
          (currency: ICurrency) => currency.s === 'TSLA'
        );
        BTC && setBTC(BTC);
        GBPUSD && setGBPUSD(GBPUSD);
        EURUSD && setEURUSD(EURUSD);
        APPLE && setAPPLE(APPLE);
        TESLA && setTESLA(TESLA);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Flex justify="center" boxShadow="md" py={2} align="center" bg="gray.100">
      {!BTC && <CircularProgress isIndeterminate color="blue.500" />}
      <HStack spacing={2}>
        {BTC && <Currency {...BTC} />}
        {GBPUSD && <Currency {...GBPUSD} />}
        {EURUSD && <Currency {...EURUSD} />}
        {APPLE && <Currency {...APPLE} />}
        {TESLA && <Currency {...TESLA} />}
      </HStack>
    </Flex>
  );
};

export default Currencies;
