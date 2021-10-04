import { render, screen, cleanup } from '@testing-library/react';
import  ArticleSearchPage from '../../pages/articles/[search]';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

  test('It should render the article search page', () => {
    const mockArticle = {
      author: 'An author',
      rights: 'No rights',
      link: 'No links',
      media: 'No media',
      title: 'No titles',
      _id: 'No ID',
    }
    const mocksearch = {
      value: "test"
    }
    render(<Provider store = {store}>
      <ArticleSearchPage uniqueArticles = {mockArticle} search = {mocksearch}/></Provider>)

      screen.debug();
    // const home = screen.getByTestId('home');
    // expect(home).toBeInTheDocument();
  })

  