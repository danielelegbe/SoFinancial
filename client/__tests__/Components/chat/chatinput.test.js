import { screen, render } from '@testing-library/react';
import ChatInput from '../../../components/Chat/ChatInput';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import withApollo from '../../../lib/withApollo';

test('testing chat input', () => {
  const X = withApollo(ChatInput)
  render(<Provider store={store}><X otherUserId={4}/></Provider>)
  const input = screen.getByTestId('chat-input')
})