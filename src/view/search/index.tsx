import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [params, setParams] = useSearchParams({});

    function handleSearch(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setParams({search: searchTerm});
    }

    useEffect(() => {
        if (params.has('search')) {
            const str = params.get('search') || '';
            setSearchTerm(str);
        }
    }, [params]);

  
    function handleClear() {
        setSearchTerm('');
        setParams({});
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