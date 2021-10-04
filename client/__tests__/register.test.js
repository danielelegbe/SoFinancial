import { render, screen, cleanup } from '@testing-library/react';
import Register from '../pages/register';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

  test('test', () => {
    render(<Provider store={store}>
      <Register /></Provider>)
    const register = screen.getByTestId('register');
    expect(register).toBeInTheDocument();
  })