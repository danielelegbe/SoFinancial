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
    const articleInput = screen.getByTestId('article-input');
    // const buttonElement = screen.getByTestId('SearchArticle')
    fireEvent.change(articleInput, { target: { value: 'article search' } })
    expect(articleInput.value).toBe('article search')
    // fireEvent.submit(buttonElement)
    // console.log(screen)
    // const articleDisp = screen.getByTestId('title');
  })