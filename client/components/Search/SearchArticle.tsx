import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const SearchArticle = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const searchHandler: React.FormEventHandler<HTMLFormElement> &
    React.FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push(`/articles/${searchQuery}`).then(() => setSearchQuery(''));
  };
  return (
    <Box data-testid='SearchArticle' as="form" w="30%" onSubmit={searchHandler}>
      <InputGroup>
        <InputLeftElement as="label" htmlFor="search">
          <SearchIcon color="blackAlpha.500" as="label" htmlFor="search" />
        </InputLeftElement>
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          id="search"
          type="text"
          borderColor="blackAlpha.500"
          bgColor="gray.50"
          textColor="blackAlpha.700"
          placeholder="Search for a topic"
        />
      </InputGroup>
    </Box>
  );
};

export default SearchArticle;
