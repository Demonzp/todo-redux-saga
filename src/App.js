import React from 'react';
import TodoList from './components/TodoList';
import TodoInfo from './components/TodoInfo';

function App() {
  return (
    <div className="App">
      <TodoInfo />
      <TodoList />
    </div>
  );
}

export default App;
