import { render, screen, cleanup, waitFor } from '@testing-library/react';
import AllMessages from '../../../components/Chat/AllMessages';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';


  test('test', async () => {
    await waitFor(() => {
      render(<Provider store={store}><AllMessages /></Provider>)
      const allMessages = screen.getByTestId('all-messages');
      expect(allMessages).toBeInTheDocument();
    });
  })