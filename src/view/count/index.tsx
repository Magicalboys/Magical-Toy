import React from 'react'

export default function index() {
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }
  
  // 相当于type TodoPreview = { title: string; completed: boolean; }
  type TodoPreview = Pick<Todo, "title" | "completed">;
  
  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
  };
  return (
    <div>index</div>
  )
}
