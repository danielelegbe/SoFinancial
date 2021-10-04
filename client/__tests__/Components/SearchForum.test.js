import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import  SearchForum from '../../components/Search/SearchForum';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

jest.mock('next/router', () => {
  return { 
    useRouter: () => {
    return{ query: {
      search: 'apple'
    }}
  }}
})

afterEach(() => {
  cleanup();
})

  test('It should render the searchhandler', () => {
    
    render(<Provider store = {store}>
      <SearchForum /></Provider>)
    const searchforum = screen.getByTestId('textbox');
    expect(searchforum).toBeInTheDocument();

    
  })

  test('It should accept a value', () => {
    render(<Provider store = {store}>
      <SearchForum/></Provider>)
    const forumInput = screen.getByTestId('forum-input');
    fireEvent.change(forumInput, { target: { value: 'forum search' } })
    expect(forumInput.value).toBe('forum search')
  })

