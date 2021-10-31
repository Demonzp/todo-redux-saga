import { fetchEmul } from "./fetchEmul"

export const getTodosReq = async (body) => {
  try {
    console.log('getTodosReq');
    const resData = await fetchEmul('/todos', body);
    return resData.data;
  } catch (error) {
    throw error;
  }
};

export const getTodosInfoReq = async () => {
  try {
    console.log('getTodosInfo');
    const resData = await fetchEmul('/todos/info');
    return resData.data;
  } catch (error) {
    throw error;
  }
};

export const addTodoReq = async (body) => {
  try {
    console.log('getTodosReq');
    const resData = await fetchEmul('/todo/add', body);
    return resData.data;
  } catch (error) {
    throw error;
  }
};

export const delTodoReq = async (body) => {
  try {
    console.log('getTodosReq');
    const resData = await fetchEmul('/todo/del', body);
    return resData.data;
  } catch (error) {
    throw error;
  }
};

export const editTodoReq = async (body) => {
  try {
    console.log('getTodosReq');
    const resData = await fetchEmul('/todo/edit', body);
    return resData.data;
  } catch (error) {
    throw error;
  }
};

export const checkTodoReq = async (body) => {
  try {
    console.log('getTodosReq');
    const resData = await fetchEmul('/todo/check', body);
    return resData.data;
  } catch (error) {
    throw error;
  }
}