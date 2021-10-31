import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FETCH_TODOS_INFO } from '../../state/reducers/todosInfo';
import { action } from '../../state/store';

const TodoInfo = () => {
  const {
    countTodos,
    countCompleted,
    countUnfinished,
    isLoading,
    isLoaded
  } = useSelector(state => state.todosInfo);

  useEffect(()=>{
    if(!isLoaded && !isLoading){
      action(FETCH_TODOS_INFO);
    }
  }, [isLoaded, isLoading]);

  return (
    <div style={{margin:"10px 0px 10px 20px"}}>
      <h1>Todos Info: </h1>
      {
        isLoading?
          <div>Loading...</div>
        :
          <Fragment>
            <h4>Count of Todos: {countTodos}</h4>
            <h4>Count of Completed Todos: {countCompleted}</h4>
            <h4>Count of Unfinished Todos: {countUnfinished}</h4>
          </Fragment>
      }
    </div>
  );
};

export default TodoInfo;