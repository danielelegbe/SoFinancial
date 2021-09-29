import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const SearchForum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const searchHandler: React.FormEventHandler<HTMLFormElement> &
    React.FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push(`/forum/${searchQuery}`).then(() => setSearchQuery(''));
  };
  return (
    <Box as="form" w="40%" my={8} onSubmit={searchHandler} mx="auto">
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
          placeholder="Search for a forum"
        />
      </InputGroup>
    </Box>
  );
};

export default SearchForum;
