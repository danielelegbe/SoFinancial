import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Currencies from '../../../components/Currencies/AllCurrencies';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { beforeEach } from 'jest-circus';

afterEach(() => {
  cleanup();
})
beforeEach(() => {
})

test('test', () => {
  render(<Provider store={store}><Currencies /></Provider>)
  const allCurr = screen.getByTestId('all-currencies')
})

test('snapshot test', () => {
  const currencyScreen = renderer.create(<Provider store={store}><Currencies /></Provider>).toJSON();
  expect(currencyScreen).toMatchSnapshot()
})