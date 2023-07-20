import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Count } from './view/countdownPro/index';
import Todo from './view/todo/index';
import TodoPro from './view/todoPro/index';
import Search from './view/search/index';

function App() {
  return (
    <div className="App">
      {/* <Count/> */}
      {/* <Todo/> */}
      {/* <TodoPro/> */}
      <Search/>
    </div>
  );
}

export default App;
