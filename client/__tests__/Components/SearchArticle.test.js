import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import  SearchArticle from '../../components/Search/SearchArticle';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

  test('It should render the searchbox', () => {
    
    render(<Provider store = {store}>
      <SearchArticle /></Provider>)
    const searcharticle = screen.getByTestId("SearchArticle");
    expect(searcharticle).toBeInTheDocument();
  })
  test('It should accept a value', () => {

    render(<Provider store = {store}>
      <SearchArticle /></Provider>)
    const forumInput = screen.getByTestId('article-input');
    fireEvent.change(forumInput, { target: { value: 'article search' } })
    expect(forumInput.value).toBe('article search')
  })