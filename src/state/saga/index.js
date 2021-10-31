import { all } from 'redux-saga/effects';
import { watcherTodoAdd, watcherTodoCheck, watcherTodoDel, watcherTodoEdit, watcherTodos, watcherTodosPage } from './todos';

function* rootSaga() {
  return yield all([
    watcherTodosPage(), 
    watcherTodoAdd(), 
    watcherTodos(), 
    watcherTodoDel(),
    watcherTodoEdit(),
    watcherTodoCheck()
  ]);
}

export default rootSaga;