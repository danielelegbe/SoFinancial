import { Box } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';
import ArticleSection from '../../components/Articles/ArticleSection';
import Article from '../../components/Articles/interfaces/Article';
import Search from '../../components/Search';

const ArticleSearchPage = ({
  uniqueArticles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box>
      <Search />
      <ArticleSection articles={uniqueArticles} />
    </Box>
  );
};

export default ArticleSearchPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const searchParam = context.query;
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
    params: { q: { searchParam }, lang: 'en', media: 'True' },
    headers: {
      'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
      'x-rapidapi-key': process.env.NEWS_API_KEY,
    },
  };

  const articles = (await axios.request(options)).data.articles;

  const seen = new Set();
  const uniqueArticles: Article[] = articles.filter((el: Article) => {
    if (!el.author) return false;
    if (!el.media) return false;
    if (!el.link) return false;
    const duplicate = seen.has(el.media);
    seen.add(el.media);
    return !duplicate;
  });

  return {
    props: { uniqueArticles },
  };
};
