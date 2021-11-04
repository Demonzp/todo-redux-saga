import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ADD_TODO, CHANGE_PAGE_TODOS, DEL_TODO, FETCH_CHECK_TODO, FETCH_EDIT_TODO } from '../state/reducers/todos';
import { action } from '../state/store';

const useTodoList = () => {
  const { todos, page, isLoading, pages, isLoaded } = useSelector(state => state.todos);

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      onPage(page);
    }
  }, [isLoaded, isLoading]);

  const onPage = (p) => {
    action(CHANGE_PAGE_TODOS, p);
  }

  const onAddTodo = (data) => {
    if (data === null) {
      return;
    }
    action(ADD_TODO, data);
  };

  const onDelTodo = (data) => {
    action(DEL_TODO, data);
  }

  const onEditTodo = (data) => {
    action(FETCH_EDIT_TODO, data);
  }

  const onCheckTodo = (data) => {
    action(FETCH_CHECK_TODO, data);
  }

  return {
    todos,
    page,
    pages,
    isLoading,
    onPage,
    onAddTodo,
    onDelTodo,
    onEditTodo,
    onCheckTodo
  }
};

export default useTodoList;