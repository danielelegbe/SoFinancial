import { render, screen, cleanup } from '@testing-library/react';
import  ArticleSearchPage from '../../pages/articles/[search]';
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

describe('test', () => {
  let mockArticles;
  beforeEach(() => {
    mockArticles = [{
      author: 'Barry',
      rights: 'MIT',
      link: 'some link',
      media: 'some media',
      title: 'Barrys title',
      _id: '1'
      },
      {
      author: 'Billy',
      rights: 'MIT',
      link: 'some link also',
      media: 'some media also',
      title: 'Billys title',
      _id: '2'
    }]
  })

  test('It should render the article search page', () => {
    const mocksearch = {
      value: "apple"
    }
    render(<Provider store = {store}>
      <ArticleSearchPage uniqueArticles={mockArticles} search={mocksearch}/></Provider>)

      // screen.debug();
    // const home = screen.getByTestId('home');
    // expect(home).toBeInTheDocument();
  })

})