import React from "react";
import "./App.css";
import { Count } from "./view/countPro/index";
import Todo from "./view/todo/index";
import TodoPro from "./view/todoPro/index";
import Search from "./view/search/index";
import VirtualScroll from "./view/srcoll";

function App() {
  return (
    <div className="App">
      {/* <Count/> */}
      {/* <Todo/> */}
      {/* <TodoPro/> */}
      {/* <Search/> */}
      <VirtualScroll />
    </div>
  );
}

export default App;
