import { Flex, Heading } from '@chakra-ui/layout';
import React from 'react';
import ArticleCard from './ArticleCard';
import Article from './interfaces/Article';

const ArticleSection = (props: any) => {
  const articles: Article[] = props.articles;
  console.log(articles);
  return (
    <Flex direction="column" align="center" w="75%" mx="auto">
      <Heading as="h3" size="lg" textAlign="center">
        Articles
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
