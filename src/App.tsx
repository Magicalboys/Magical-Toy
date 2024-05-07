import React from 'react';
import './App.css';
import Count from './view/countPro/index';
import Todo from './view/todo/index';
import TodoPro from './view/todoPro/index';
import Search from './view/search/index';
import VirtualScroll from './view/srcoll';
import Pagination from './view/pagination';
import SearchPro from './view/searchPro';
import Menu from './view/menus/index';

function App() {
    return (
        <div className="App">
            {/* <Count/> */}
            {/* <Todo/> */}
            {/* <TodoPro/> */}
            {/* <Search /> */}
            {/* <SearchPro /> */}
            <Menu/>
            {/* <Pagination /> */}
            {/* <VirtualScroll /> */}
        </div>
    );
}

export default App;
