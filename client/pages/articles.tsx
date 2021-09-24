import { Box } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import ArticleCard from '../components/Articles/ArticleCard';
import Article from '../components/Articles/interfaces/Article';

const Articles = ({
  uniqueArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {};

export default Articles;

export const getStaticProps: GetStaticProps = async () => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
    params: { q: 'trending', lang: 'en', media: 'True' },
    headers: {
      'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
      'x-rapidapi-key': process.env.NEWS_API_KEY,
    },
  };

  const articles = (await axios.request(options)).data.articles;

  const seen = new Set();
  const uniqueArticles: Article[] = articles
    .filter((el: Article) => {
      if (!el.author) return false;
      if (!el.media) return false;
      if (!el.link) return false;
      const duplicate = seen.has(el.media);
      seen.add(el.media);
      return !duplicate;
    })
    .slice(0, 6);
  if (!uniqueArticles)
    return {
      notFound: true,
    };

  return {
    props: { uniqueArticles },
    revalidate: 10,
  };
};
