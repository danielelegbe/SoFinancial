import { Flex, Heading } from '@chakra-ui/layout';
import React from 'react';
import ArticleCard from './ArticleCard';
import Article from './interfaces/Article';

const ArticleSection = (props: any) => {
  const articles: Article[] = props.articles;
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
        {articles.map(({ _id, link, media, title, author }) => (
          <ArticleCard
            key={_id}
            author={author}
            link={link}
            title={title}
            media={media}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ArticleSection;
