import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import  Home from '../../pages/index';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { afterEach, describe } from 'jest-circus';

describe('Home page tests', () => {
  let mockArticle
  beforeEach(() => {
    mockArticle = {
      author: 'An author',
      rights: 'No rights',
      link: 'No links',
      media: 'No media',
      title: 'No titles',
      _id: 'No ID',
    }
  })
  afterEach(() => {
    cleanup()
  })

  test('It should render the index page', () => {
    render(<Provider store = {store}><Home uniqueArticles = {mockArticle}/></Provider>)
      const home = screen.getByTestId('home');
      expect(home).toBeInTheDocument();
  })

  test('snapshot home page test', () => {
    const homePage = renderer.create(<Provider store = {store}><Home uniqueArticles = {mockArticle}/></Provider>).toJSON();
    expect(homePage).toMatchSnapshot()
  })
})