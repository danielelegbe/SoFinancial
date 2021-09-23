import { Flex, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import Article from './interfaces/Article';
const src =
  'https://static.politico.com/dims4/default/111c5d8/2147483647/resize/1160x%3E/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F20%2F76%2F6ef9e08a42a9a73f71eb0cb78472%2Fap21264791412622-1.jpg';

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
