import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import ArticleSection from '../components/Articles/ArticleSection';
import Navbar from '../components/Navbar/Navbar';
import axios, { AxiosRequestConfig } from 'axios';
import Article from '../components/Articles/interfaces/Article';

const Home = ({
  filteredArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Flex direction="column">
      <Navbar />
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
      <ArticleSection articles={filteredArticles} />
    </Flex>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  var options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
    params: { q: 'business', lang: 'en', media: 'True' },
    headers: {
      'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
      'x-rapidapi-key': process.env.NEWS_API_KEY,
    },
  };

  const articles = (await axios.request(options)).data.articles;

  const filteredArticles: Article[] = articles
    .filter((article: Article) => {
      if (!article.author) return false;
      if (!article.media) return false;
      if (!article.link) return false;
      return article;
    })
    .slice(0, 8);

  if (!filteredArticles)
    return {
      notFound: true,
    };

  return {
    props: { filteredArticles },
    revalidate: 10,
  };
};
