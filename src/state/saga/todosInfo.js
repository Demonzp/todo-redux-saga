import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import { getTodosInfoReq } from '../../services/todoFetch';
import { CHECK_TODO } from '../reducers/todos';
import { ADD_COMPLETED_TODOS, ADD_COUNT_TODOS, ADD_UNFINISHED_TODOS, DEL_COMPLETED_TODOS, DEL_COUNT_TODOS, DEL_UNFINISHED_TODOS, FETCH_TODOS_INFO, SET_IS_LOADING_INFO, SET_TODOS_INFO } from '../reducers/todosInfo';

const setLoading = function* () {
  yield put({ type: SET_IS_LOADING_INFO, payload: true });
}

const setLoaded = function* () {
  yield put({ type: SET_IS_LOADING_INFO, payload: false });
}

const changeTodos = function* (isAdd) {
  if(isAdd){
    yield put({ type: ADD_COUNT_TODOS});
  }else{
    yield put({type: DEL_COUNT_TODOS});
  }
}

const changeUnfinished = function* (isFinish) {
  if(isFinish){
    yield put({type: DEL_UNFINISHED_TODOS});
  }else{
    yield put({type: ADD_UNFINISHED_TODOS});
  }
}

const changeCompleted = function* (isFinish) {
  if(isFinish){
    yield put({type: ADD_COMPLETED_TODOS});
  }else{
    yield put({type: DEL_COMPLETED_TODOS});
  }
}

const computeCheckTodo = function* ({payload}){
  yield changeCompleted(payload.isFinish);
  yield changeUnfinished(payload.isFinish);
}

export const addTodoInfo = function* (){
  yield changeTodos(true);
}

export const delTodoInfo = function* (isFinish){
  yield changeTodos(false);
  if(isFinish){
    yield changeCompleted(false);
  }else{
    yield changeUnfinished(true);
  }
   
}

const getTodosInfo = function* () {
  try {
    const info = yield getTodosInfoReq();

    yield put({
      type: SET_TODOS_INFO, payload: {
        ...info,
        countTodos: info.count
      }
    });
  } catch (error) {
    console.error('error = ', error.message);
    alert(error.message);
    yield setLoaded();
  }
}

export function* watcherTodosInfo() {
  yield takeEvery(FETCH_TODOS_INFO, setLoading);
  yield takeLatest(FETCH_TODOS_INFO, getTodosInfo);
}

export function* watcherTodosCheck(){
  yield takeEvery(CHECK_TODO, computeCheckTodo);
}