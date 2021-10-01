import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Article from './interfaces/Article';

const ArticleCard = ({ author, link, title, media, rights }: Article) => {
  return (
    <Flex
      data-testid='article-card-container'
      _hover={{
        cursor: 'pointer',
        transform: 'scale(1.02)',
      }}
      transition="0.2s ease-out"
      direction="column"
      justify="space-between"
      boxShadow="md"
      borderRadius="md"
      mb={10}
      mx={5}
      w="sm"
      h="sm"
      pb={8}
      as="a"
      target={'_blank'}
      href={link}
    >
      {media && (
        <Image
          position="relative"
          alt={title}
          maxH="50%"
          objectFit="cover"
          src={media}
        />
      )}
      <Text textAlign="center" px={3}>
        {title}
      </Text>
      <Stack>
        <Text fontWeight="bold" textAlign="center">
          {author}
        </Text>
        <Text fontWeight="bold" textAlign="center">
          {rights}
        </Text>
      </Stack>
    </Flex>
  );
};

export default ArticleCard;
