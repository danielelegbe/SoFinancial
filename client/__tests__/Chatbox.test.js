import { render, screen, cleanup } from '@testing-library/react';
import  ChatBox from '../components/Chat/ChatBox';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

  test('It should render the chatbox', () => {
    
    // render(<Provider store = {store}>
    //   <ChatBox /></Provider>)
    // screen.getByRole('');
  })