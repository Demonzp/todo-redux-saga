const initialState = {
  countTodos: 0,
  countCompleted: 0,
  countUnfinished: 0,
  isLoading: false,
  isLoaded: false,
};

export const SET_TODOS_INFO = 'SET_TODOS_INFO';
export const FETCH_TODOS_INFO = 'FETCH_TODOS_INFO';
export const SET_IS_LOADING_INFO = 'SET_IS_LOADING_INFO';
export const ADD_COMPLETED_TODOS = 'ADD_COMPLETED_TODOS';
export const ADD_UNFINISHED_TODOS = 'ADD_UNFINISHED_TODOS';
export const ADD_COUNT_TODOS = 'ADD_COUNT_TODOS';
export const DEL_COMPLETED_TODOS = 'DEL_COMPLETED_TODOS';
export const DEL_UNFINISHED_TODOS = 'DEL_UNFINISHED_TODOS';
export const DEL_COUNT_TODOS = 'DEL_COUNT_TODOS';

const todosInfo = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SET_TODOS_INFO: {
      return {
        ...state,
        countTodos: payload.countTodos,
        countCompleted: payload.countCompleted,
        countUnfinished: payload.countUnfinished,
        isLoaded: true,
        isLoading: false
      };
    }

    case SET_IS_LOADING_INFO: {
      return{
        ...state,
        isLoading: payload
      }
    }

    case ADD_COUNT_TODOS: {
      return{
        ...state,
        countTodos: state.countTodos + 1,
        countUnfinished: state.countUnfinished + 1,
      }
    }

    case ADD_UNFINISHED_TODOS: {
      return{
        ...state,
        countUnfinished: state.countUnfinished + 1,
      }
    }

    case ADD_COMPLETED_TODOS: {
      return{
        ...state,
        countCompleted: state.countCompleted + 1,
      }
    }

    case DEL_COUNT_TODOS: {
      return{
        ...state,
        countTodos: state.countTodos - 1,
      }
    }

    case DEL_UNFINISHED_TODOS: {
      return{
        ...state,
        countUnfinished: state.countUnfinished - 1,
      }
    }

    case DEL_COMPLETED_TODOS: {
      return{
        ...state,
        countCompleted: state.countCompleted - 1,
      }
    }

    default:
      return state;
  }
};

export default todosInfo;