import React, {useState, useEffect} from 'react';
import {useDebounce} from './useDebounce';
const mockData = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
];

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            const results = mockData.filter((item) =>
                item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
            setResults(results);
        } else {
            setResults([]);
        }
    }, [debouncedSearchTerm]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {results.map((result) => (
                    <li key={result}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
