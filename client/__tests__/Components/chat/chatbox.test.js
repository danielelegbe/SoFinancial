import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatBox from '../../../components/Chat/ChatBox';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';

test('testing chatbox', () => {
  render(<Provider store={store}><ChatBox /></Provider>)
  const chatbox = screen.getByTestId('chat-box');
  expect(chatbox).toBeInTheDocument();
})