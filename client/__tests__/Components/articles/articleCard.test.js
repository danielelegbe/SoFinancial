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

  test('expect the correct text to be rendered to the screen', () => {
    render(<Provider store={store}><ArticleCard {...singleArticle} /></Provider>)
    const articleCard = screen.getByTestId('article-card-container');

    const imgsource = screen.getByTestId('image')
    

    expect(articleCard).toHaveTextContent(singleArticle.author);
    expect(articleCard).toHaveTextContent(singleArticle.rights);
    expect(articleCard.getAttribute("href")).toEqual(singleArticle.link);
    expect(imgsource.getAttribute("src")).toContain(singleArticle.media);
    expect(articleCard).toHaveTextContent(singleArticle.title);
  })
})