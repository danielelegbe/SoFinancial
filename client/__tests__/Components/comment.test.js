import { render, screen, cleanup } from '@testing-library/react';
import Comment from '../../components/Comments/Comment';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import withApollo from '../../lib/withApollo';

test('test', () => {
    const mockComment = {
      __typename: 'Comment' | undefined,
      id: 4,
      content: 'some content',
      createdAt: Date.now()
    }
    const X = withApollo(Comment)
    render(<Provider store={store}><X comment={mockComment} /></Provider>)
    const comm = screen.getByTestId('comment');
  })