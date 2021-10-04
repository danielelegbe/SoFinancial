import { screen, render } from '@testing-library/react';
import Currency from '../../../components/Currencies/Currency';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import '@testing-library/jest-dom';

test('test', () => {
  const currency = {
    symbol: 'btc',
    price: 1000
  }
  render(<Provider store={store}><Currency currency={currency} /></Provider>)
  const curr = screen.getByTestId('currency')
})