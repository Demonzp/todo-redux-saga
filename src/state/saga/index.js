import { all } from 'redux-saga/effects';
import { watcherTodoAdd, watcherTodoCheck, watcherTodoDel, watcherTodoEdit, watcherTodos, watcherTodosPage } from './todos';
import { watcherTodosCheck, watcherTodosInfo } from './todosInfo';

function* rootSaga() {
  return yield all([
    watcherTodosPage(), 
    watcherTodoAdd(), 
    watcherTodos(), 
    watcherTodoDel(),
    watcherTodoEdit(),
    watcherTodoCheck(),
    watcherTodosInfo(),
    watcherTodosCheck(),
  ]);
}

export default rootSaga;