import React from 'react';
import './App.css';
import Count from './view/countPro/index';
import Todo from './view/todo/index';
import TodoPro from './view/todoPro/index';
import Search from './view/search/index';
import VirtualScroll from './view/srcoll';
import Pagination from './view/pagination';
import SearchPro from './view/searchPro';

function App() {
    return (
        <div className="App">
            {/* <Count/> */}
            {/* <Todo/> */}
            {/* <TodoPro/> */}
            {/* <Search /> */}
            <SearchPro />
            {/* <Pagination /> */}
            {/* <VirtualScroll /> */}
        </div>
    );
}

export default App;
