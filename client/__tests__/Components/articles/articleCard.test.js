import { render, screen, cleanup } from '@testing-library/react';
import ArticleCard from '../../../components/Articles/ArticleCard';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

describe('should render an article', () => {
  let singleArticle;
  beforeEach(() => {
    singleArticle = {
    author: 'Barry',
    rights: 'MIT',
    link: 'some link',
    media: 'some media',
    title: 'Barrys title',
    _id: '1'
    }
  })

  test('test', () => {
    render(<Provider store={store}><ArticleCard {...singleArticle} /></Provider>)
    const articleCard = screen.getByTestId('article-card-container');
    expect(articleCard).toBeInTheDocument();
  })
})