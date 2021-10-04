import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Login from '../../pages/login';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

describe('Login page tests', () => {
  afterEach(() => {
    cleanup()
  })

  test('test', () => {
    render(<Provider store={store}><Login /></Provider>)
    const login = screen.getByTestId('login');
    expect(login).toBeInTheDocument();
  })

  test('snapshot login page test', () => {
    const login = renderer.create(<Provider store={store}><Login /></Provider>).toJSON();
    expect(login).toMatchSnapshot()
  })
})
  