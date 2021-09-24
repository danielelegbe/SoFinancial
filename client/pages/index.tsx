import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import ArticleSection from '../components/Articles/ArticleSection';
import Article from '../components/Articles/interfaces/Article';
import PostsSection from '../components/Posts/PostsSection';

const Home = ({
  uniqueArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Flex direction="column">
      <Stack spacing={12} justify="center" direction="row" my={8}>
        <InputGroup w="30%">
          <InputLeftElement>
            <SearchIcon color="blackAlpha.500" />
          </InputLeftElement>
          <Input
            borderColor="blackAlpha.500"
            bgColor="gray.50"
            textColor="blackAlpha.700"
            placeholder="Search for a topic"
          />
        </InputGroup>
      </Stack>
      {uniqueArticles.length > 0 && (
        <ArticleSection articles={uniqueArticles} />
      )}
      <PostsSection />
    </Flex>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
    params: { topic: 'finance', lang: 'en', media: 'True' },
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

  if (!uniqueArticles)
    return {
      notFound: true,
    };

  return {
    props: { uniqueArticles },
    revalidate: 10,
  };
};
