const initialState = {
  todos: [],
  isLoading: false,
  pages: 0,
  page: 1
};

export const SET_TODOS = 'SET_TODOS';
export const FETCH_TODOS = 'FETCH_TODOS';
export const CHANGE_PAGE_TODOS = 'CHANGE_PAGE_TODOS';
export const SET_IS_LOADING_TODOS = 'SET_IS_LOADING';
export const ADD_TODO = 'ADD_TODO';
export const DEL_TODO = 'DEL_TODO';
export const SET_IS_LOADING_TODO = 'SET_IS_LOADING_TODO';
export const FETCH_EDIT_TODO = 'FETCH_EDIT_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const FETCH_CHECK_TODO = 'FETCH_CHECK_TODO';
export const CHECK_TODO = 'CHECK_TODO';

const todos = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SET_TODOS: {
      return {
        ...state,
        todos: payload.todos,
        pages: payload.pages,
        isLoading: false
      };
    }

    case CHANGE_PAGE_TODOS: {
      return {
        ...state,
        page: payload
      };
    }

    case SET_IS_LOADING_TODOS: {
      return {
        ...state,
        isLoading: payload
      };
    }

    case SET_IS_LOADING_TODO:{
      const idx = state.todos.findIndex(todo=>todo.id===payload.id);
      let newTodos = [...state.todos];

      if(idx>=0){
        newTodos = [
          ...newTodos.slice(0, idx),
          {...newTodos[idx], isLoading: payload.isLoading},
          ...newTodos.slice(idx+1)
        ];
      }

      return{
        ...state,
        todos: newTodos
      }
    }

    case EDIT_TODO:{
      const idx = state.todos.findIndex(todo=>todo.id===payload.id);
      let newTodos = [...state.todos];

      if(idx>=0){
        newTodos = [
          ...newTodos.slice(0, idx),
          payload,
          ...newTodos.slice(idx+1)
        ];
      }

      return{
        ...state,
        todos: newTodos
      }
    }

    case CHECK_TODO:{
      const idx = state.todos.findIndex(todo=>todo.id===payload.id);
      let newTodos = [...state.todos];

      if(idx>=0){
        newTodos = [
          ...newTodos.slice(0, idx),
          payload,
          ...newTodos.slice(idx+1)
        ];
      }

      return{
        ...state,
        todos: newTodos
      }
    }

    default:
      return state;
  }
};

export default todos;