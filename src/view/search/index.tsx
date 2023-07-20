import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
interface IParams{
  q:string
}
function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = useSearchParams({});

  function handleSearch(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setParams({ search: searchTerm });
  }

  useEffect(()=>{
    if(params.has('q')){
      const str = params.get('q') || '';
      setSearchTerm(str)
    }
  },[])

  function handleClear() {
    setSearchTerm('');
    setParams({ search: '' });
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
}

export default Search;