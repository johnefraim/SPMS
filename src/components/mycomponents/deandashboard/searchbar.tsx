import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        type="text"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        placeholder="Search for students..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;