import { render, screen, cleanup, fireEvent,onChange } from '@testing-library/react';
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

  test('It should render the searchhandler', () => {
    
    render(<Provider store = {store}>
      <SearchForum /></Provider>)
    // screen.getByRole('')
    const searchforum = screen.getByRole('textbox');
    expect(searchforum).toBeInTheDocument();

    
  })

  test('It should accept a value', () => {

    // const onChange = jest.fn()
    render(<Provider store = {store}>
      <SearchForum/></Provider>)
    fireEvent.change(screen.getByRole('textbox'), {
      target: {value: "Berkshire Hathaway"},
    })

    // expect(onChange).toHaveBeenCalledTimes(1);
  })

