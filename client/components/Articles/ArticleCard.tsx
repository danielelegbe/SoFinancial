import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Article from './interfaces/Article';

const ArticleCard = ({ author, link, title, media }: Article) => {
  return (
    <Flex
      _hover={{ cursor: 'pointer' }}
      direction="column"
      justify="space-between"
      boxShadow="md"
      borderRadius="md"
      mb={10}
      mx={5}
      w="xs"
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
      <Text fontWeight="bold" textAlign="center" position="relative">
        {author}
      </Text>
    </Flex>
  );
};

export default ArticleCard;
