import { render, screen, cleanup } from '@testing-library/react';
import ArticleCard from '../../../components/Articles/ArticleCard';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

  test('test', () => {
    render(<Provider store={store}><ArticleCard /></Provider>)
    const articleCard = screen.getByTestId('article-card-container');
    expect(articleCard).toBeInTheDocument();
  })