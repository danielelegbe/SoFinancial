import { render, screen, cleanup } from '@testing-library/react';
import Navbar from '../../components/Navbar/Navbar';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

  test('test', () => {
    render(<Provider store={store}><Navbar /></Provider>)
    const navbar = screen.getByTestId('nav-container');
    expect(navbar).toBeInTheDocument();
  })