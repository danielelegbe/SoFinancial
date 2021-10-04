import { Flex, Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import ArticleCard from './ArticleCard';
import Article from './interfaces/Article';

interface PropTypes {
  articles: Article[];
}
const ArticleSection = ({ articles }: PropTypes) => {
  const router = useRouter();
  return (
    <Flex data-testid='article-selection-container' direction="column" align="center" w="75%" mx="auto">
      <Heading
        data-testid='title'
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
        {articles.map((article,i) => (
          <Box key={article._id}  data-testid={`article-list-item-${i}`}>
            <ArticleCard  {...article} />
            </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default ArticleSection;
