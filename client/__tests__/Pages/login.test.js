import { render, screen, cleanup } from '@testing-library/react';
import Login from '../../pages/login';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

  test('test', () => {
    render(<Provider store={store}>
      <Login /></Provider>)
    const login = screen.getByTestId('login');
    expect(login).toBeInTheDocument();
  })