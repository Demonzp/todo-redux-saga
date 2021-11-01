import { takeEvery, takeLatest, put } from 'redux-saga/effects'
import { addTodoReq, checkTodoReq, delTodoReq, editTodoReq, getTodosReq } from '../../services/todoFetch';
import { ADD_TODO, CHANGE_PAGE_TODOS, DEL_TODO, FETCH_TODOS, SET_IS_LOADING_TODO, SET_IS_LOADING_TODOS, SET_TODOS, FETCH_EDIT_TODO, EDIT_TODO, CHECK_TODO, FETCH_CHECK_TODO } from '../reducers/todos';
import { addTodoInfo, delTodoInfo } from './todosInfo';

let crutchPage = 0;

const setLoading = function* () {
  yield put({ type: SET_IS_LOADING_TODOS, payload: true });
};

const setLoaded = function* (){
  yield put({ type: SET_IS_LOADING_TODOS, payload: false });
}

const setLoadingTodo = function* (payload){
  yield put({type: SET_IS_LOADING_TODO, payload})
}

const forceTodos = function* (){
  yield put({type: FETCH_TODOS, payload: crutchPage});
}

const getTodos = function* ({payload}) {
  try {
    const res = yield getTodosReq(payload);

    if(res.todos.length<=0 && payload>1){
      crutchPage = payload-1;
      yield forceTodos();
      return;
    }

    res.todos = res.todos.map(todo=>{
      return {
        ...todo,
        isLoading: false
      }
    });

    crutchPage = payload;

    yield put({ type: SET_TODOS, payload: {...res, page: crutchPage} });
  } catch (error) {
    console.error('error = ', error.message);
    alert(error.message);
    yield setLoaded();
  }
};

const addTodo = function* ({payload}){
  try {
    yield addTodoReq(payload);
    yield addTodoInfo();
    yield forceTodos();
  } catch (error) {
    console.error('error = ', error.message);
    alert(error.message);
    yield setLoaded();
  }
}

const delTodo = function* ({payload}){
  try {
    yield setLoadingTodo({id: payload.id, isLoading: true});
    yield delTodoReq(payload.id);
    yield delTodoInfo(payload.isFinish);
    yield forceTodos();
    return true;
  } catch (error) {
    console.error('error = ', error.message);
    alert(error.message);
    yield setLoadingTodo({id: payload.id, isLoading: false});
  }
}

const editTodo = function* ({payload}){
  try {
    yield setLoadingTodo({id: payload.id, isLoading: true});
    const todo = yield editTodoReq(payload);
    yield put({type: EDIT_TODO, payload: {...todo, isLoading: false}});
  } catch (error) {
    console.error('error = ', error.message);
    yield setLoadingTodo({id: payload.id, isLoading: false});
    alert(error.message);
  }
}

const checkTodo = function* ({payload}){
  try {
    yield setLoadingTodo({id: payload.id, isLoading: true});
    const todo = yield checkTodoReq(payload);
    yield put({type: CHECK_TODO, payload: {...todo, isLoading: false}});
  } catch (error) {
    console.error('error = ', error.message);
    yield setLoadingTodo({id: payload.id, isLoading: false});
    alert(error.message);
  }
}

export function* watcherTodos(){
  yield takeEvery(FETCH_TODOS, setLoading);
  yield takeLatest(FETCH_TODOS, getTodos);
}

export function* watcherTodosPage(){
  yield takeEvery(CHANGE_PAGE_TODOS, setLoading);
  yield takeLatest(CHANGE_PAGE_TODOS, getTodos);
}

export function* watcherTodoAdd(){
  yield takeEvery(ADD_TODO, addTodo);
}

export function* watcherTodoDel(){
  yield takeEvery(DEL_TODO, delTodo);
}

export function* watcherTodoEdit(){
  yield takeEvery(FETCH_EDIT_TODO, editTodo);
}

export function* watcherTodoCheck(){
  yield takeEvery(FETCH_CHECK_TODO, checkTodo);
}