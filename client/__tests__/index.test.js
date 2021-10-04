import { render, screen, cleanup } from '@testing-library/react';
import  Home from '../pages/index';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

  test('It should render the index page', () => {
    const mockArticle = {
      author: 'An author',
      rights: 'No rights',
      link: 'No links',
      media: 'No media',
      title: 'No titles',
      _id: 'No ID',
    }
    render(<Provider store = {store}>
      <Home uniqueArticles = {mockArticle}/></Provider>)
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
  })

  