import { Box, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import Search from '../Search/SearchArticle';
import ArticleCard from './ArticleCard';
import Article from './interfaces/Article';

interface PropTypes {
  articles: Article[];
}
const ArticleSection = ({ articles }: PropTypes) => {
  const router = useRouter();
  return (
    <Flex direction="column" align="center" w="75%" mx="auto">
      <Heading
        style={{ textTransform: 'capitalize' }}
        as="h3"
        size="lg"
        textAlign="center"
      >
        {router.query.search}
      </Heading>
      <Flex
        direction="row"
        justify="space-evenly"
        my={8}
        mx="auto"
        flexWrap="wrap"
      >
        {articles.map((article) => (
          <ArticleCard key={article._id} {...article} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ArticleSection;
