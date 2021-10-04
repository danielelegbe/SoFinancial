import { render, screen, cleanup } from '@testing-library/react';
import Register from '../../pages/register';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

describe('Login page tests', () => {
  afterEach(() => {
    cleanup()
  })

  test('test', () => {
    render(<Provider store={store}><Register /></Provider>)
    const register = screen.getByTestId('register');
    expect(register).toBeInTheDocument();
  })

  test('snapshot register page test', () => {
    const register = renderer.create(<Provider store={store}><Register /></Provider>).toJSON();
    expect(register).toMatchSnapshot()
  })
})
  

  