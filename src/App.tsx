import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Count } from './view/countdown/index';
import Todo from './view/todoList/index';

function App() {
  return (
    <div className="App">
      {/* <Count/> */}
      <Todo/>
    </div>
  );
}

export default App;
