import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const searchHandler: React.FormEventHandler<HTMLFormElement> &
    React.FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push(`/articles/${searchQuery}`);
  };
  return (
    <Flex as="form" onSubmit={searchHandler} justify="center" my="4">
      <InputGroup w="30%">
        <InputLeftElement>
          <SearchIcon color="blackAlpha.500" />
        </InputLeftElement>

        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          borderColor="blackAlpha.500"
          bgColor="gray.50"
          textColor="blackAlpha.700"
          placeholder="Search for a topic"
        />
      </InputGroup>
    </Flex>
  );
};

export default Search;
