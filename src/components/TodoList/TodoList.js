import useTodoList from '../../hooks/useTodoList';
import TodoItem from '../TodoItem';
import SimplePaginator from '../SiplePaginator';

const TodoList = ()=>{
  const {todos, isLoading, page, pages, onPage, onAddTodo} = useTodoList();

  return (
    <div style={{marginLeft: 20}}>
      <h1>TODO_LIST: </h1>
      <button style={{marginBottom: 10}} onClick={()=>onAddTodo(prompt('Enter title of Todo', ''))}>add todo</button>
      <div>
        <SimplePaginator onPage={onPage} pages={pages} forcePage={page}/>
        <ul>
          {
            isLoading?
              <div>Loading...</div>
            :
              todos.map((todo, i)=>{
                return <TodoItem key={todo.id} todo={todo} i={i}/>;
              })
          }
        </ul>
        <SimplePaginator onPage={onPage} pages={pages} forcePage={page}/>
      </div>
    </div>
  );
};

export default TodoList;