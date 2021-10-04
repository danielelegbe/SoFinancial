import 'setimmediate'
import { Flex, Heading } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import ArticleSection from '../components/Articles/ArticleSection';
import Article from '../components/Articles/interfaces/Article';
import PostsSection from '../components/Posts/PostsSection';

const Home = ({
  uniqueArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head >
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Heading data-testid='home'>Home</Heading>
      <Flex direction="column">
        {uniqueArticles.length > 0 && (
          <ArticleSection articles={uniqueArticles} />
        )}
        <PostsSection />
      </Flex>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  //Option 1
  // const options: AxiosRequestConfig = {
  //   method: 'GET',
  //   url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
  //   params: { topic: 'business', lang: 'en', media: 'True' },
  //   headers: {
  //     'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
  //     'x-rapidapi-key': process.env.RAPID_API_KEY,
  //   },
  // };

  //Option 2
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/latest_headlines',
    params: { topic: 'finance', lang: 'en' },
    headers: {
      'x-api-key': process.env.TRIAL_API_KEY,
    },
  };

  const articles = (await axios.request(options)).data.articles;

  const seen = new Set();
  const uniqueArticles: Article[] = articles
    .filter((el: Article) => {
      // if (!el.author) return false (testing, may add in future)
      if (!el.media) return false;
      if (!el.link) return false;
      const duplicate = seen.has(el.media);
      seen.add(el.media);
      return !duplicate;
    })
    .slice(0, 4);

  return {
    props: { uniqueArticles },
    revalidate: 60,
  };
};
