import { Box, Stack } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import ArticleSection from '../../components/Articles/ArticleSection';
import Article from '../../components/Articles/interfaces/Article';
import Search from '../../components/Search/SearchArticle';

const ArticleSearchPage = ({
  uniqueArticles,
  search,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{search}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Stack my={6} align="center">
        <Search />
      </Stack>
      <ArticleSection articles={uniqueArticles} />
    </>
  );
};

export default ArticleSearchPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { search } = context.query;
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
    params: { q: search, lang: 'en', media: 'True' },
    headers: {
      'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
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
    props: { uniqueArticles, search },
  };
};
