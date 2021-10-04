import { render, screen, cleanup } from '@testing-library/react';
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