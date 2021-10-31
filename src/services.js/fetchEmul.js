import { createId } from './global';

const DELAY = 1.5 * 1000;

let dataTodos = [
  {
    id: 1,
    title: 'to do todolist',
    isFinish: false
  },
  {
    id: 2,
    title: 'dawdfaf wafa w',
    isFinish: true
  },
  {
    id: 3,
    title: 'dawdawddawdaw dad a dawd aw da farg  wafa w',
    isFinish: false
  }
];

const server = {
  '/todos': (page = 1) => {
    const tPage = page - 1;
    const limit = 2;

    const start = tPage * limit;
    const end = Math.min(start + limit, dataTodos.length);
    const arr = dataTodos.slice(start, end);

    return { data: { todos: arr, pages: Math.ceil(dataTodos.length / 2) } };
  },

  '/todo/add': (title) => {

    if (!title || typeof title !== 'string' || title.length <= 0) {

      throw new Error('title is require!');
    }

    const newTodo = {
      title,
      id: createId(10),
      isFinish: false
    }

    dataTodos = [...dataTodos, newTodo];

    return {data: dataTodos};
  },

  '/todo/del': (id) => {
    if (!id) {
      throw new Error('id is require!');
    }

    const idx = dataTodos.findIndex(todo => todo.id === id);

    if (idx < 0) {
      throw new Error(`todo of id="${id}" not found`);
    }

    dataTodos = [
      ...dataTodos.slice(0, idx),
      ...dataTodos.slice(idx+1)
    ];

    return {data: id};
  },

  '/todo/edit': ({id, title})=>{
    if (!id) {
      throw new Error('id is require!');
    }

    if (!title || typeof title !== 'string' || title.length <= 0) {

      throw new Error('title is require!');
    }

    const idx = dataTodos.findIndex(todo => todo.id === id);

    if (idx < 0) {
      throw new Error(`todo of id="${id}" not found`);
    }

    dataTodos = [
      ...dataTodos.slice(0, idx),
      {...dataTodos[idx], title},
      ...dataTodos.slice(idx+1)
    ];

    return {data: dataTodos.find((todo)=>todo.id===id)};
  },

  '/todo/check': ({id, isFinish})=>{
    if (!id) {
      throw new Error('id is require!');
    }

    if (isFinish===undefined || typeof isFinish !== 'boolean') {

      throw new Error('isFinish is require!');
    }

    const idx = dataTodos.findIndex(todo => todo.id === id);

    if (idx < 0) {
      throw new Error(`todo of id="${id}" not found`);
    }

    dataTodos = [
      ...dataTodos.slice(0, idx),
      {...dataTodos[idx], isFinish},
      ...dataTodos.slice(idx+1)
    ];
    
    return {data: dataTodos.find((todo)=>todo.id===id)};
  }
}

export const fetchEmul = (path, body) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(server[path](body));
      } catch (error) {
        reject(error);
      }
    }, DELAY);
  });
}