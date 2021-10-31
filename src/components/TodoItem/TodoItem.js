import { Fragment, useMemo } from 'react';
import useTodoList from '../../hooks/useTodoList';

const cell = {
  minWidth: 60
}

const TodoItem = ({ todo, i }) => {
  const { onDelTodo, onEditTodo, onCheckTodo } = useTodoList();
  const color = useMemo(() => i % 2 ? '#0000' : '#f7f7f7', [i]);

  const handleEdit = ()=>{
    const newTitle = prompt('Change titile: ', todo.title);
    onEditTodo({title: newTitle, id: todo.id});
  }

  const handleChackbox = (e)=>{
    onCheckTodo({id: todo.id, isFinish: e.target.checked});
  }

  return (
    <li>
      <div style={{ display: "flex", alignItems: "center", backgroundColor: color }}>
        {
          todo.isLoading?
            <h3>Loading...</h3>
          :
            <Fragment>
              <div style={cell}>
                <input type="checkbox" checked={todo.isFinish} onChange={handleChackbox} />
              </div>
              <div style={{ ...cell, width: 200, paddingRight: 8 }}>
                <h3>{todo.title}</h3>
              </div>
              <div style={cell}>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => onDelTodo(todo)}>Delete</button>
              </div>
            </Fragment>
        }
      </div>
    </li>
  );
};

export default TodoItem;