import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers';
import rootSaga from './saga';

const saga = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(saga));

saga.run(rootSaga);

export const action = (type, payload) => store.dispatch({type, payload});

export default store;