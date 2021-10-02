import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import ArticleSection from '../../../components/Articles/ArticleSection';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';

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

  test('test', () => {
    render(<Provider store={store}><ArticleSection articles={mockArticles} /></Provider>)
    const sectionArticles = screen.getByTestId('article-selection-container');
  })
})