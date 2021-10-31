import { combineReducers } from 'redux';
import todos from './todos';
import todosInfo from './todosInfo';

const reducer = combineReducers({
  todos,
  todosInfo
});

export default reducer;